/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Classes for all types of block events.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.Events.BlockBase');
goog.provide('Blockly.Events.BlockChange');
goog.provide('Blockly.Events.BlockCreate');
goog.provide('Blockly.Events.BlockDelete');
goog.provide('Blockly.Events.BlockMove');
goog.provide('Blockly.Events.BlockUpdate'); // CASS_ADDED
goog.provide('Blockly.Events.Change');  // Deprecated.
goog.provide('Blockly.Events.Create');  // Deprecated.
goog.provide('Blockly.Events.Delete');  // Deprecated.
goog.provide('Blockly.Events.Move');  // Deprecated.

goog.require('Blockly.Events');
goog.require('Blockly.Events.Abstract');
goog.require('Blockly.connectionTypes');
goog.require('Blockly.registry');
goog.require('Blockly.utils.Coordinate');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.xml');
goog.require('Blockly.Xml');

goog.requireType('Blockly.Block');


/**
 * Abstract class for a block event.
 * @param {!Blockly.Block=} opt_block The block this event corresponds to.
 *     Undefined for a blank event.
 * @extends {Blockly.Events.Abstract}
 * @constructor
 */
Blockly.Events.BlockBase = function(opt_block) {
  Blockly.Events.BlockBase.superClass_.constructor.call(this);
  this.isBlank = typeof opt_block == 'undefined';

  //this.blockDB_ = {}; // CASS_ADDED // COMMENTED

  /**
   * The block id for the block this event pertains to
   * @type {string}
   */
  this.blockId = this.isBlank ? '' : opt_block.id;

  //if (opt_block != undefined && opt_block.workspace == null) return null; // CASS_ADDED // COMMENTED

  /**
   * The workspace identifier for this event.
   * @type {string}
   */
  this.workspaceId = this.isBlank ? '' : opt_block.workspace.id;
};
Blockly.utils.object.inherits(Blockly.Events.BlockBase,
    Blockly.Events.Abstract);

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.BlockBase.prototype.toJson = function() {
  var json = Blockly.Events.BlockBase.superClass_.toJson.call(this);
  json['blockId'] = this.blockId;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.BlockBase.prototype.fromJson = function(json) {
  Blockly.Events.BlockBase.superClass_.fromJson.call(this, json);
  this.blockId = json['blockId'];
};

/**
 * Class for a block change event.
 * @param {!Blockly.Block=} opt_block The changed block.  Undefined for a blank
 *     event.
 * @param {string=} opt_element One of 'field', 'comment', 'disabled', etc.
 * @param {?string=} opt_name Name of input or field affected, or null.
 * @param {*=} opt_oldValue Previous value of element.
 * @param {*=} opt_newValue New value of element.
 * @extends {Blockly.Events.BlockBase}
 * @constructor
 */
Blockly.Events.Change = function(opt_block, opt_element, opt_name, opt_oldValue,
    opt_newValue) {
  Blockly.Events.Change.superClass_.constructor.call(this, opt_block);
  if (!opt_block) {
    return;  // Blank event to be populated by fromJson.
  }
  this.element = typeof opt_element == 'undefined' ? '' : opt_element;
  this.name = typeof opt_name == 'undefined' ? '' : opt_name;
  this.oldValue = typeof opt_oldValue == 'undefined' ? '' : opt_oldValue;
  this.newValue = typeof opt_newValue == 'undefined' ? '' : opt_newValue;
};
Blockly.utils.object.inherits(Blockly.Events.Change, Blockly.Events.BlockBase);

/**
 * Class for a block change event.
 * @param {!Blockly.Block=} opt_block The changed block.  Undefined for a blank
 *     event.
 * @param {string=} opt_element One of 'field', 'comment', 'disabled', etc.
 * @param {?string=} opt_name Name of input or field affected, or null.
 * @param {*=} opt_oldValue Previous value of element.
 * @param {*=} opt_newValue New value of element.
 * @extends {Blockly.Events.BlockBase}
 * @constructor
 */
Blockly.Events.BlockChange = Blockly.Events.Change;

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.Change.prototype.type = Blockly.Events.CHANGE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.Change.prototype.toJson = function() {
  var json = Blockly.Events.Change.superClass_.toJson.call(this);
  json['element'] = this.element;
  if (this.name) {
    json['name'] = this.name;
  }
  json['oldValue'] = this.oldValue;
  json['newValue'] = this.newValue;
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.Change.prototype.fromJson = function(json) {
  Blockly.Events.Change.superClass_.fromJson.call(this, json);
  this.element = json['element'];
  this.name = json['name'];
  this.oldValue = json['oldValue'];
  this.newValue = json['newValue'];
};

/**
 * Does this event record any change of state?
 * @return {boolean} False if something changed.
 */
Blockly.Events.Change.prototype.isNull = function() {
  return this.oldValue == this.newValue;
};

/**
 * Run a change event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.Change.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  var block = workspace.getBlockById(this.blockId);
  if (!block) {
    console.warn("Can't change non-existent block: " + this.blockId);
    return;
  }
  if (block.mutator) {
    // Close the mutator (if open) since we don't want to update it.
    block.mutator.setVisible(false);
  }
  var value = forward ? this.newValue : this.oldValue;
  switch (this.element) {
    case 'field':
      var field = block.getField(this.name);
      if (field) {
        field.setValue(value);
      } else {
        console.warn("Can't set non-existent field: " + this.name);
      }
      break;
    case 'comment':
      block.setCommentText(/** @type {string} */ (value) || null);
      break;
    case 'collapsed':
      block.setCollapsed(!!value);
      break;
    case 'disabled':
      block.setEnabled(!value);
      break;
    case 'inline':
      block.setInputsInline(!!value);
      break;
    case 'mutation':
      var oldMutation = '';
      if (block.mutationToDom) {
        var oldMutationDom = block.mutationToDom();
        oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
      }
      if (block.domToMutation) {
        var dom = Blockly.Xml.textToDom(/** @type {string} */ (value) || '<mutation/>');
        block.domToMutation(dom);
      }
      Blockly.Events.fire(new (Blockly.Events.get(Blockly.Events.CHANGE))(
          block, 'mutation', null, oldMutation, value));
      break;
    default:
      console.warn('Unknown change type: ' + this.element);
  }
};

/**
 * Class for a block creation event.
 * @param {!Blockly.Block=} opt_block The created block.  Undefined for a blank
 *     event.
 * @extends {Blockly.Events.BlockBase}
 * @constructor
 */
Blockly.Events.Create = function(opt_block) {
  Blockly.Events.Create.superClass_.constructor.call(this, opt_block);
  if (!opt_block) {
    return;  // Blank event to be populated by fromJson.
  }
  if (opt_block.isShadow()) {
    // Moving shadow blocks is handled via disconnection.
    this.recordUndo = false;
  }

  if (opt_block.workspace.rendered) {
    this.xml = Blockly.Xml.blockToDomWithXY(opt_block);
  } else {
    this.xml = Blockly.Xml.blockToDom(opt_block);
  }
  this.ids = Blockly.Events.getDescendantIds(opt_block);
};
Blockly.utils.object.inherits(Blockly.Events.Create, Blockly.Events.BlockBase);

/**
 * Class for a block creation event.
 * @param {!Blockly.Block=} block The created block. Undefined for a blank
 *     event.
 * @extends {Blockly.Events.BlockBase}
 * @constructor
 */
Blockly.Events.BlockCreate = Blockly.Events.Create;

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.Create.prototype.type = Blockly.Events.CREATE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.Create.prototype.toJson = function() {
  var json = Blockly.Events.Create.superClass_.toJson.call(this);
  json['xml'] = Blockly.Xml.domToText(this.xml);
  json['ids'] = this.ids;
  if (!this.recordUndo) {
    json['recordUndo'] = this.recordUndo;
  }
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.Create.prototype.fromJson = function(json) {
  Blockly.Events.Create.superClass_.fromJson.call(this, json);
  this.xml = Blockly.Xml.textToDom(json['xml']);
  this.ids = json['ids'];
  if (json['recordUndo'] !== undefined) {
    this.recordUndo = json['recordUndo'];
  }
};

/**
 * Run a creation event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.Create.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    var xml = Blockly.utils.xml.createElement('xml');
    xml.appendChild(this.xml);
    Blockly.Xml.domToWorkspace(xml, workspace);
  } else {
    for (var i = 0, id; (id = this.ids[i]); i++) {
      var block = workspace.getBlockById(id);
      if (block) {
        block.dispose(false);
      } else if (id == this.blockId) {
        // Only complain about root-level block.
        console.warn("Can't uncreate non-existent block: " + id);
      }
    }
  }
};

/**
 * Class for a block deletion event.
 * @param {!Blockly.Block=} opt_block The deleted block.  Undefined for a blank
 *     event.
 * @extends {Blockly.Events.BlockBase}
 * @constructor
 */
Blockly.Events.Delete = function(opt_block) {
  Blockly.Events.Delete.superClass_.constructor.call(this, opt_block);
  if (!opt_block) {
    return;  // Blank event to be populated by fromJson.
  }
  if (opt_block.getParent()) {
    throw Error('Connected blocks cannot be deleted.');
  }
  if (opt_block.isShadow()) {
    // Respawning shadow blocks is handled via disconnection.
    this.recordUndo = false;
  }

  if (opt_block.workspace.rendered) {
    this.oldXml = Blockly.Xml.blockToDomWithXY(opt_block);
  } else {
    this.oldXml = Blockly.Xml.blockToDom(opt_block);
  }
  this.ids = Blockly.Events.getDescendantIds(opt_block);

  // <- Blockly.Block.prototype.setCollapsed in block.js
  //this.blockDB_[this.ids] = Blockly.Trashcan.prototype.cleanBlockXML_(this.oldXml); // CASS_ADDED // refer to onDelete_ in trashcan.js
};
Blockly.utils.object.inherits(Blockly.Events.Delete, Blockly.Events.BlockBase);

/**
 * Class for a block deletion event.
 * @param {Blockly.Block} block The deleted block.  Null for a blank event.
 * @extends {Blockly.Events.BlockBase}
 * @constructor
 */
Blockly.Events.BlockDelete = Blockly.Events.Delete;

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.Delete.prototype.type = Blockly.Events.DELETE;



// CASS_ADDED // COMMENTD
//Blockly.Events.BlockUpdate = function (opt_block, sub_event) {
//    Blockly.Events.BlockUpdate.superClass_.constructor.call(this, opt_block);
//    if (!opt_block) {
//        return;
//    }
//    if (opt_block.isShadow()) {
//        this.recordUndo = false;
//    }

//    //console.error(sub_event);

//    if (sub_event == 'collapse') {

//        var _xy = opt_block.getRelativeToSurfaceXY();
//        //console.error(_xy);

//        var _xml = Blockly.Xml.blockToDomWithXY(opt_block);
//        //console.error(_xml);

//        if (_xml.nodeName == '#document-fragment') {
//            return;
//        }

//        opt_block.workspace.blockDBCollapsed_[opt_block.id] = { 'xml': _xml, 'x': _xy.x, 'y': _xy.y };

//        //console.error(opt_block.id);
//        //console.error(opt_block.workspace.blockDBCollapsed_[opt_block.id]);

//        //console.error("domToBlock :");
//        //console.error(Blockly.Xml.domToBlock(_xml, opt_block.workspace))

//        //console.error("domToBlockHeadless_ :");
//        //console.error(Blockly.Xml.domToBlockHeadless_(_xml, opt_block.workspace));

//        //console.error("domToText :");
//        //var _xml_text = Blockly.Xml.domToText(_xml);
//        //console.error(_xml_text);

//        //console.error("domToPrettyText :");
//        //console.error(Blockly.Xml.domToPrettyText(_xml));

//        //console.error("textToDom :");
//        //var _xml_dom = Blockly.Xml.textToDom(_xml_text);
//        //console.error(_xml_dom);

//        //Blockly.Xml.domToWorkspace(_xml_dom, opt_block.workspace);
        
//    }
//    else if (sub_event == 'uncollapse') {

//        //console.error(opt_block.id);
//        //console.error(opt_block.workspace.blockDBCollapsed_[opt_block.id]);

//        var _id = opt_block.id;

//        var _workspace = opt_block.workspace;

//        //opt_block.id = Blockly.utils.genUid(); // <- in core/utils.js

//        //for (var i = 0; i < _workspace.blockDB_.length; i++) {
//        //    if (_workspace.blockDB_[i].id == _id) {
//        //        _workspace.blockDB_[i].id = opt_block.id;
//        //    }
//        //}

//        if (_workspace.blockDBCollapsed_[_id] != undefined) {


//            // https://github.com/google/blockly/issues/3881
//            //Blockly.Workspace.prototype.removeBlockById(opt_block.id);
//            opt_block.dispose();


//            var blockXmlObject = _workspace.blockDBCollapsed_[_id];

//            var block = Blockly.Xml.domToBlock(blockXmlObject.xml, _workspace);
//            //var block = Blockly.Xml.domToBlockHeadless_(opt_block.workspace.blockDBCollapsed_[opt_block.id], _workspace);
//            //console.error(block);

//            //var xy = block.getRelativeToSurfaceXY();
//            ////var width = block.workspace.getWidth();
//            //console.error(xy);

//            block.moveBy(blockXmlObject.x, blockXmlObject.y); // <- in block.js

//            delete block.workspace.blockDBCollapsed_[_id];
//        }
//    }

//    // https://makecode.com/develop/blocklyupgrade

//    //Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(
//    //    '<xml>' +
//    //    '  <block type="stack_block"/>' +
//    //    '</xml>'
//    //), this.workspace);
//};
//Blockly.utils.object.inherits(Blockly.Events.BlockUpdate, Blockly.Events.BlockBase);
//Blockly.Events.BlockUpdate.prototype.type = Blockly.Events.UPDATE;


// CASS_REFER
//Blockly.Block.prototype.moveBy = function(dx, dy) {
//  if (this.parentBlock_) {
//    throw Error('Block has parent.');
//  }
//  var event = new Blockly.Events.BlockMove(this);
//  this.xy_.translate(dx, dy);
//  event.recordNew();
//  Blockly.Events.fire(event);
//};


/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.Delete.prototype.toJson = function() {
  var json = Blockly.Events.Delete.superClass_.toJson.call(this);
  json['oldXml'] = Blockly.Xml.domToText(this.oldXml);
  json['ids'] = this.ids;
  if (!this.recordUndo) {
    json['recordUndo'] = this.recordUndo;
  }
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.Delete.prototype.fromJson = function(json) {
  Blockly.Events.Delete.superClass_.fromJson.call(this, json);
  this.oldXml = Blockly.Xml.textToDom(json['oldXml']);
  this.ids = json['ids'];
  if (json['recordUndo'] !== undefined) {
    this.recordUndo = json['recordUndo'];
  }
};

/**
 * Run a deletion event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.Delete.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  if (forward) {
    for (var i = 0, id; (id = this.ids[i]); i++) {
      var block = workspace.getBlockById(id);
      if (block) {
        block.dispose(false);
      } else if (id == this.blockId) {
        // Only complain about root-level block.
        console.warn("Can't delete non-existent block: " + id);
      }
    }
  } else {
    var xml = Blockly.utils.xml.createElement('xml');
    xml.appendChild(this.oldXml);
    Blockly.Xml.domToWorkspace(xml, workspace);
  }
};

/**
 * Class for a block move event.  Created before the move.
 * @param {!Blockly.Block=} opt_block The moved block.  Undefined for a blank
 *     event.
 * @extends {Blockly.Events.BlockBase}
 * @constructor
 */
Blockly.Events.Move = function(opt_block) {
  Blockly.Events.Move.superClass_.constructor.call(this, opt_block);
  if (!opt_block) {
    return;  // Blank event to be populated by fromJson.
  }
  if (opt_block.isShadow()) {
    // Moving shadow blocks is handled via disconnection.
    this.recordUndo = false;
  }

  var location = this.currentLocation_();
  this.oldParentId = location.parentId;
  this.oldInputName = location.inputName;
  this.oldCoordinate = location.coordinate;

    // CASS_ADDED // COMMENTED
    //if (opt_block.workspace.blockDBCollapsed_[opt_block.id] != undefined) {
    //    var _xy = opt_block.getRelativeToSurfaceXY();
    //    opt_block.workspace.blockDBCollapsed_[opt_block.id].x = _xy.x;
    //    opt_block.workspace.blockDBCollapsed_[opt_block.id].y = _xy.y;
    //}
};
Blockly.utils.object.inherits(Blockly.Events.Move, Blockly.Events.BlockBase);

/**
 * Class for a block move event.  Created before the move.
 * @param {Blockly.Block} block The moved block.  Null for a blank event.
 * @extends {Blockly.Events.BlockBase}
 * @constructor
 */
Blockly.Events.BlockMove = Blockly.Events.Move;

/**
 * Type of this event.
 * @type {string}
 */
Blockly.Events.Move.prototype.type = Blockly.Events.MOVE;

/**
 * Encode the event as JSON.
 * @return {!Object} JSON representation.
 */
Blockly.Events.Move.prototype.toJson = function() {
  var json = Blockly.Events.Move.superClass_.toJson.call(this);
  if (this.newParentId) {
    json['newParentId'] = this.newParentId;
  }
  if (this.newInputName) {
    json['newInputName'] = this.newInputName;
  }
  if (this.newCoordinate) {
    json['newCoordinate'] = Math.round(this.newCoordinate.x) + ',' +
        Math.round(this.newCoordinate.y);
  }
  if (!this.recordUndo) {
    json['recordUndo'] = this.recordUndo;
  }
  return json;
};

/**
 * Decode the JSON event.
 * @param {!Object} json JSON representation.
 */
Blockly.Events.Move.prototype.fromJson = function(json) {
  Blockly.Events.Move.superClass_.fromJson.call(this, json);
  this.newParentId = json['newParentId'];
  this.newInputName = json['newInputName'];
  if (json['newCoordinate']) {
    var xy = json['newCoordinate'].split(',');
    this.newCoordinate =
        new Blockly.utils.Coordinate(Number(xy[0]), Number(xy[1]));
  }
  if (json['recordUndo'] !== undefined) {
    this.recordUndo = json['recordUndo'];
  }
};

/**
 * Record the block's new location.  Called after the move.
 */
Blockly.Events.Move.prototype.recordNew = function() {
  var location = this.currentLocation_();
  this.newParentId = location.parentId;
  this.newInputName = location.inputName;
  this.newCoordinate = location.coordinate;
};

/**
 * Returns the parentId and input if the block is connected,
 *   or the XY location if disconnected.
 * @return {!Object} Collection of location info.
 * @private
 */
Blockly.Events.Move.prototype.currentLocation_ = function() {
  var workspace = this.getEventWorkspace_();
  var block = workspace.getBlockById(this.blockId);
  var location = {};
  var parent = block.getParent();
  if (parent) {
    location.parentId = parent.id;
    var input = parent.getInputWithBlock(block);
    if (input) {
      location.inputName = input.name;
    }
  } else {
    location.coordinate = block.getRelativeToSurfaceXY();
  }
  return location;
};

/**
 * Does this event record any change of state?
 * @return {boolean} False if something changed.
 */
Blockly.Events.Move.prototype.isNull = function() {
  return this.oldParentId == this.newParentId &&
      this.oldInputName == this.newInputName &&
      Blockly.utils.Coordinate.equals(this.oldCoordinate, this.newCoordinate);
};

/**
 * Run a move event.
 * @param {boolean} forward True if run forward, false if run backward (undo).
 */
Blockly.Events.Move.prototype.run = function(forward) {
  var workspace = this.getEventWorkspace_();
  var block = workspace.getBlockById(this.blockId);
  if (!block) {
    console.warn("Can't move non-existent block: " + this.blockId);
    return;
  }
  var parentId = forward ? this.newParentId : this.oldParentId;
  var inputName = forward ? this.newInputName : this.oldInputName;
  var coordinate = forward ? this.newCoordinate : this.oldCoordinate;
  var parentBlock = null;
  if (parentId) {
    parentBlock = workspace.getBlockById(parentId);
    if (!parentBlock) {
      console.warn("Can't connect to non-existent block: " + parentId);
      return;
    }
  }
  if (block.getParent()) {
    block.unplug();
  }
  if (coordinate) {
    var xy = block.getRelativeToSurfaceXY();
    block.moveBy(coordinate.x - xy.x, coordinate.y - xy.y);
  } else {
    var blockConnection = block.outputConnection || block.previousConnection;
    var parentConnection;
    var connectionType = blockConnection.type;
    if (inputName) {
      var input = parentBlock.getInput(inputName);
      if (input) {
        parentConnection = input.connection;
      }
    } else if (connectionType == Blockly.connectionTypes.PREVIOUS_STATEMENT) {
      parentConnection = parentBlock.nextConnection;
    }
    if (parentConnection) {
      blockConnection.connect(parentConnection);
    } else {
      console.warn("Can't connect to non-existent input: " + inputName);
    }
  }
};

Blockly.registry.register(Blockly.registry.Type.EVENT, Blockly.Events.CREATE,
    Blockly.Events.Create);
Blockly.registry.register(Blockly.registry.Type.EVENT, Blockly.Events.DELETE,
    Blockly.Events.Delete);
Blockly.registry.register(Blockly.registry.Type.EVENT, Blockly.Events.CHANGE,
    Blockly.Events.Change);
Blockly.registry.register(Blockly.registry.Type.EVENT, Blockly.Events.MOVE,
    Blockly.Events.Move);
//Blockly.registry.register(Blockly.registry.Type.EVENT, Blockly.Events.UPDATE, // CASS_ADDED // COMMENTED
//    Blockly.Events.BlockUpdate);

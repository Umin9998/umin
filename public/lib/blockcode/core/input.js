/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Object representing an input (value, statement, or dummy).
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Input');

goog.require('Blockly.Connection');
/** @suppress {extraRequire} */
goog.require('Blockly.constants');
goog.require('Blockly.fieldRegistry');
/** @suppress {extraRequire} */
goog.require('Blockly.FieldLabel');
goog.require('Blockly.inputTypes');

goog.requireType('Blockly.Block');
goog.requireType('Blockly.BlockSvg');
goog.requireType('Blockly.Field');
goog.requireType('Blockly.RenderedConnection');


/**
 * Class for an input with an optional field.
 * @param {number} type The type of the input.
 * @param {string} name Language-neutral identifier which may used to find this
 *     input again.
 * @param {!Blockly.Block} block The block containing this input.
 * @param {Blockly.Connection} connection Optional connection for this input.
 * @constructor
 */
Blockly.Input = function(type, name, block, connection) {
  if (type != Blockly.inputTypes.DUMMY && !name) {
    throw Error('Value inputs and statement inputs must have non-empty name.');
  }
  /** @type {number} */
  this.type = type;
  /** @type {string} */
  this.name = name;
  /**
   * @type {!Blockly.Block}
   * @private
   */
  this.sourceBlock_ = block;
  /** @type {Blockly.Connection} */
  this.connection = connection;
  /** @type {!Array.<!Blockly.Field>} */
  this.fieldRow = [];
};

/**
 * Alignment of input's fields (left, right or centre).
 * @type {number}
 */
Blockly.Input.prototype.align = Blockly.constants.ALIGN.LEFT;

/**
 * Is the input visible?
 * @type {boolean}
 * @private
 */
Blockly.Input.prototype.visible_ = true;

/**
 * Get the source block for this input.
 * @return {Blockly.Block} The source block, or null if there is none.
 */
Blockly.Input.prototype.getSourceBlock = function() {
  return this.sourceBlock_;
};

/**
 * Add a field (or label from string), and all prefix and suffix fields, to the
 * end of the input's field row.
 * @param {string|!Blockly.Field} field Something to add as a field.
 * @param {string=} opt_name Language-neutral identifier which may used to find
 *     this field again.  Should be unique to the host block.
 * @return {!Blockly.Input} The input being append to (to allow chaining).
 */
//Blockly.Input.prototype.appendField = function(field, opt_name) { // ORG
Blockly.Input.prototype.appendField = function (field, opt_name, x_offset, y_offset, min_width) { // CASS_2021!!
  //this.insertFieldAt(this.fieldRow.length, field, opt_name); // ORG
  //return this; // ORG

    // CASS_ADDED
    var _x_offset = x_offset | 0;
    var _y_offset = y_offset | 0;
    var _min_width = min_width ? min_width : null;
    this.insertFieldAt(this.fieldRow.length, field, opt_name, _x_offset, _y_offset, _min_width); // CASS
    return this;
};

/**
 * Inserts a field (or label from string), and all prefix and suffix fields, at
 * the location of the input's field row.
 * @param {number} index The index at which to insert field.
 * @param {string|!Blockly.Field} field Something to add as a field.
 * @param {string=} opt_name Language-neutral identifier which may used to find
 *     this field again.  Should be unique to the host block.
 * @return {number} The index following the last inserted field.
 */
//Blockly.Input.prototype.insertFieldAt = function(index, field, opt_name) { // ORG
Blockly.Input.prototype.insertFieldAt = function (index, field, opt_name, x_offset, y_offset, min_width) { // CASS
  if (index < 0 || index > this.fieldRow.length) {
    throw Error('index ' + index + ' out of bounds.');
  }
  // Falsy field values don't generate a field, unless the field is an empty
  // string and named.
  if (!field && !(field == '' && opt_name)) {
    return index;
  }

  // Generate a FieldLabel when given a plain text field.
  if (typeof field == 'string') {
    field = /** @type {!Blockly.Field} **/ (Blockly.fieldRegistry.fromJson({
      'type': 'field_label',
      'text': field,
    }));
  }

  field.setSourceBlock(this.sourceBlock_);
  if (this.sourceBlock_.rendered) {
    field.init();
    field.applyColour();
  }
  field.name = opt_name;
  field.setVisible(this.isVisible());

  if (field.prefixField) {
    // Add any prefix.
    index = this.insertFieldAt(index, field.prefixField);
  }
  // Add the field to the field row.
  this.fieldRow.splice(index, 0, field);
  ++index;
  if (field.suffixField) {
    // Add any suffix.
    index = this.insertFieldAt(index, field.suffixField);
  }

  if (this.sourceBlock_.rendered) {
    this.sourceBlock_ = /** @type {!Blockly.BlockSvg} */ (this.sourceBlock_);
    this.sourceBlock_.render();
    // Adding a field will cause the block to change shape.
    this.sourceBlock_.bumpNeighbours();
  }


    field.x_offset = x_offset | 0; // CASS_ADDED // -> positionTextElement_ in field.js
    field.y_offset = y_offset | 0; // CASS_ADDED

    //field.min_width = min_width | null; // CASS_ADDED
    field.min_width = min_width; // CASS_ADDED


  return index;
};

/**
 * Remove a field from this input.
 * @param {string} name The name of the field.
 * @param {boolean=} opt_quiet True to prevent an error if field is not present.
 * @return {boolean} True if operation succeeds, false if field is not present
 *     and opt_quiet is true.
 * @throws {Error} if the field is not present and opt_quiet is false.
 */
Blockly.Input.prototype.removeField = function(name, opt_quiet) {
  for (var i = 0, field; (field = this.fieldRow[i]); i++) {
    if (field.name === name) {
      field.dispose();
      this.fieldRow.splice(i, 1);
      if (this.sourceBlock_.rendered) {
        this.sourceBlock_ = /** @type {!Blockly.BlockSvg} */ (this.sourceBlock_);
        this.sourceBlock_.render();
        // Removing a field will cause the block to change shape.
        this.sourceBlock_.bumpNeighbours();
      }
      return true;
    }
  }
  if (opt_quiet) {
    return false;
  } else {
    throw Error('Field "' + name + '" not found.');
  }
};

/**
 * Gets whether this input is visible or not.
 * @return {boolean} True if visible.
 */
Blockly.Input.prototype.isVisible = function() {
  return this.visible_;
};

/**
 * Sets whether this input is visible or not.
 * Should only be used to collapse/uncollapse a block.
 * @param {boolean} visible True if visible.
 * @return {!Array.<!Blockly.BlockSvg>} List of blocks to render.
 * @package
 */
Blockly.Input.prototype.setVisible = function(visible) {
  // Note: Currently there are only unit tests for block.setCollapsed()
  // because this function is package. If this function goes back to being a
  // public API tests (lots of tests) should be added.
  var renderList = [];
  if (this.visible_ == visible) {
    return renderList;
  }
  this.visible_ = visible;

  for (var y = 0, field; (field = this.fieldRow[y]); y++) {
    field.setVisible(visible);
  }
  if (this.connection) {
    this.connection =
      /** @type {!Blockly.RenderedConnection} */ (this.connection);
    // Has a connection.
    if (visible) {
      renderList = this.connection.startTrackingAll();
    } else {
      this.connection.stopTrackingAll();
    }
    var child = this.connection.targetBlock();
    if (child) {
      child.getSvgRoot().style.display = visible ? 'block' : 'none';
    }
  }
  return renderList;
};

/**
 * Mark all fields on this input as dirty.
 * @package
 */
Blockly.Input.prototype.markDirty = function() {
  for (var y = 0, field; (field = this.fieldRow[y]); y++) {
    field.markDirty();
  }
};

/**
 * Change a connection's compatibility.
 * @param {string|Array.<string>|null} check Compatible value type or
 *     list of value types.  Null if all types are compatible.
 * @return {!Blockly.Input} The input being modified (to allow chaining).
 */
Blockly.Input.prototype.setCheck = function(check) {
  if (!this.connection) {
    throw Error('This input does not have a connection.');
  }
  this.connection.setCheck(check);
  return this;
};

/**
 * Change the alignment of the connection's field(s).
 * @param {number} align One of the values of Blockly.constants.ALIGN.
 *   In RTL mode directions are reversed, and ALIGN.RIGHT aligns to the left.
 * @return {!Blockly.Input} The input being modified (to allow chaining).
 */
Blockly.Input.prototype.setAlign = function(align) {
  this.align = align;
  if (this.sourceBlock_.rendered) {
    this.sourceBlock_ = /** @type {!Blockly.BlockSvg} */ (this.sourceBlock_);
    this.sourceBlock_.render();
  }
  return this;
};

/**
 * Changes the connection's shadow block.
 * @param {Element} shadow DOM representation of a block or null.
 * @return {Blockly.Input} The input being modified (to allow chaining).
 */
Blockly.Input.prototype.setShadowDom = function(shadow) {
  if (!this.connection) {
    throw Error('This input does not have a connection.');
  }
  this.connection.setShadowDom(shadow);
  return this;
};

/**
 * Returns the xml representation of the connection's shadow block.
 * @return {Element} Shadow DOM representation of a block or null.
 */
Blockly.Input.prototype.getShadowDom = function() {
  if (!this.connection) {
    throw Error('This input does not have a connection.');
  }
  return this.connection.getShadowDom();
};

/**
 * Initialize the fields on this input.
 */
Blockly.Input.prototype.init = function() {
  if (!this.sourceBlock_.workspace.rendered) {
    return;  // Headless blocks don't need fields initialized.
  }
  for (var i = 0; i < this.fieldRow.length; i++) {
    this.fieldRow[i].init(); // CASS_2021!
  }
};

/**
 * Sever all links to this input.
 * @suppress {checkTypes}
 */
Blockly.Input.prototype.dispose = function() {
  for (var i = 0, field; (field = this.fieldRow[i]); i++) {
    field.dispose();
  }
  if (this.connection) {
    this.connection.dispose();
  }
  this.sourceBlock_ = null;
};

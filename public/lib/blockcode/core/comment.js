/**
 * @license
 * Copyright 2011 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Object representing a code comment.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Comment');

goog.require('Blockly.browserEvents');
goog.require('Blockly.Bubble');
goog.require('Blockly.Css');
goog.require('Blockly.Events');
/** @suppress {extraRequire} */
goog.require('Blockly.Events.BlockChange');
/** @suppress {extraRequire} */
goog.require('Blockly.Events.BubbleOpen');
goog.require('Blockly.Icon');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.object');
goog.require('Blockly.utils.Svg');
goog.require('Blockly.utils.userAgent');
/** @suppress {extraRequire} */
goog.require('Blockly.Warning');

goog.requireType('Blockly.Block');
goog.requireType('Blockly.BlockSvg');
goog.requireType('Blockly.utils.Coordinate');
goog.requireType('Blockly.utils.Size');
goog.requireType('Blockly.WorkspaceSvg');

/**
 * Class for a comment.
 * @param {!Blockly.Block} block The block associated with this comment.
 * @extends {Blockly.Icon}
 * @constructor
 */
Blockly.Comment = function (block) {
  Blockly.Comment.superClass_.constructor.call(this, block);

  /**
   * The model for this comment.
   * @type {!Blockly.Block.CommentModel}
   * @private
   */
  this.model_ = block.commentModel;
  // If someone creates the comment directly instead of calling
  // block.setCommentText we want to make sure the text is non-null;
  this.model_.text = this.model_.text || '';

  /**
   * The model's text value at the start of an edit.
   * Used to tell if an event should be fired at the end of an edit.
   * @type {?string}
   * @private
   */
  this.cachedText_ = '';

  /**
   * Mouse up event data.
   * @type {?Blockly.browserEvents.Data}
   * @private
   */
  this.onMouseUpWrapper_ = null;

  /**
   * Wheel event data.
   * @type {?Blockly.browserEvents.Data}
   * @private
   */
  this.onWheelWrapper_ = null;

  /**
   * Change event data.
   * @type {?Blockly.browserEvents.Data}
   * @private
   */
  this.onChangeWrapper_ = null;

  /**
   * Input event data.
   * @type {?Blockly.browserEvents.Data}
   * @private
   */
  this.onInputWrapper_ = null;

  this.createIcon();
};
Blockly.utils.object.inherits(Blockly.Comment, Blockly.Icon);

/**
 * Draw the comment icon.
 * @param {!Element} group The icon group.
 * @protected
 */
Blockly.Comment.prototype.drawIcon_ = function (group) {
  // Circle.
  Blockly.utils.dom.createSvgElement(
    Blockly.utils.Svg.CIRCLE,
    { class: 'blocklyIconShape', r: '8', cx: '8', cy: '8' },
    group
  );
  // Can't use a real '?' text character since different browsers and operating
  // systems render it differently.
  // Body of question mark.
  Blockly.utils.dom.createSvgElement(
    // ORG
    //Blockly.utils.Svg.PATH,
    //{
    //  'class': 'blocklyIconSymbol',
    //  'd': 'm6.8,10h2c0.003,-0.617 0.271,-0.962 0.633,-1.266 2.875,-2.405' +
    //    '0.607,-5.534 -3.765,-3.874v1.7c3.12,-1.657 3.698,0.118 2.336,1.25' +
    //    '-1.201,0.998 -1.201,1.528 -1.204,2.19z'},
    //group);

    Blockly.utils.Svg.PATH,
    {
      class: 'blocklyIconSymbol',
      // ORG
      //'d': 'm6.8,10h2c0.003,-0.617 0.271,-0.962 0.633,-1.266 2.875,-2.405' +
      //  '0.607,-5.534 -3.765,-3.874v1.7c3.12,-1.657 3.698,0.118 2.336,1.25' +
      //  '-1.201,0.998 -1.201,1.528 -1.204,2.19z'
      // CASS_ADDED
      //'d': 'M27.6,1H4.4A3.406,3.406,0,0,0,1,4.4V21.6A3.407,3.407,0,0,0,4.4,25H7v5a1,1,0,0,0,1.676.737L14.935,25H27.6A3.407,3.407,0,0,0,31,21.6V4.4A3.406,3.406,0,0,0,27.6,1ZM29,21.6A1.4,1.4,0,0,1,27.6,23H14.546a1,1,0,0,0-.676.263L9,27.727V24a1,1,0,0,0-1-1H4.4A1.4,1.4,0,0,1,3,21.6V4.4A1.4,1.4,0,0,1,4.4,3H27.6A1.4,1.4,0,0,1,29,4.4Z'
      d: 'M 11.97 0.665 h -7.98 a 3.329 3.329 90 0 0 -3.325 3.325 v 5.32 a 3.331 3.331 90 0 0 2.66 3.2585 v 2.0615 a 0.665 0.665 90 0 0 1.0341 0.5533 l 3.8204 -2.5483 h 3.7905 a 3.329 3.329 90 0 0 3.325 -3.325 v -5.32 a 3.329 3.329 90 0 0 -3.325 -3.325 z m -1.33 7.98 h -5.32 a 0.665 0.665 90 0 1 0 -1.33 h 5.32 a 0.665 0.665 90 0 1 0 1.33 z m 1.33 -2.66 h -7.98 a 0.665 0.665 90 0 1 0 -1.33 h 7.98 a 0.665 0.665 90 0 1 0 1.33 z'
    },
    group
  );

  // CASS_COMMENTED
  // Dot of question mark.
  //Blockly.utils.dom.createSvgElement(
  //    Blockly.utils.Svg.RECT,
  //    {
  //      'class': 'blocklyIconSymbol',
  //      'x': '6.8',
  //      'y': '10.78',
  //      'height': '2',
  //      'width': '2'
  //    },
  //    group);
};

// CASS_PXT // ADDED
/**
 * Create the editor for the comment's bubble.
 * PXT Blockly: keep creatEditor_ and createTextEditor_
 * functions separate, to leave space for top icons
 * @return {!Element} The top-level node of the editor.
 * @private
 */
Blockly.Comment.prototype.createEditor_ = function () {
  // Create core elements for the block.
  /**
   * @type {SVGElement}
   * @private
   */
  this.svgGroup_ = Blockly.utils.dom.createSvgElement('g', { class: 'blocklyCommentBubble' }, null);
  this.svgGroup_.translate_ = '';

  this.createTextEditor_();
  this.svgGroup_.appendChild(this.foreignObject_);

  // Add the delete and minimize icon
  this.createTopBarIcons_();

  this.resizeTextarea_();

  if (this.block_.isEditable()) {
    Blockly.bindEventWithChecks_(this.deleteIcon_, 'mousedown', this, this.deleteMouseDown_);
    Blockly.bindEventWithChecks_(this.deleteIcon_, 'mouseup', this, this.deleteMouseUp_);
    Blockly.bindEventWithChecks_(this.minimizeArrow_, 'mousedown', this, this.minimizeMouseUp_);
  }

  return this.svgGroup_;
};

// ORG
///**
// * Create the editor for the comment's bubble.
// * @return {!SVGElement} The top-level node of the editor.
// * @private
// */

// CASS_PXT
/**
 * Create the textarea editor for the comment's bubble.
 * @return {!Element} The top-level node of the editor.
 * @private
 */
//Blockly.Comment.prototype.createEditor_ = function() { // ORG
Blockly.Comment.prototype.createTextEditor_ = function () {
  // CASS_PXT
  /* Create the editor.  Here's the markup that will be generated in
   * editable mode:
    <foreignObject x="8" y="8" width="164" height="164">
      <body xmlns="http://www.w3.org/1999/xhtml" class="blocklyMinimalBody">
        <textarea xmlns="http://www.w3.org/1999/xhtml"
            class="blocklyCommentTextarea"
            style="height: 164px; width: 164px;"></textarea>
      </body>
    </foreignObject>
   * For non-editable mode see Warning.textToDom_.
   */

  this.foreignObject_ = Blockly.utils.dom.createSvgElement(
    Blockly.utils.Svg.FOREIGNOBJECT,
    //{'x': Blockly.Bubble.BORDER_WIDTH, 'y': Blockly.Bubble.BORDER_WIDTH}, // ORG
    // CASS
    { x: Blockly.Bubble.BORDER_WIDTH, y: Blockly.Bubble.BORDER_WIDTH + Blockly.WorkspaceCommentSvg.TOP_BAR_HEIGHT }, // pxt-blockly: add space for top bar height
    null
  );

  var body = document.createElementNS(Blockly.utils.dom.HTML_NS, 'body');
  body.setAttribute('xmlns', Blockly.utils.dom.HTML_NS);
  body.className = 'blocklyMinimalBody';

  this.textarea_ = document.createElementNS(Blockly.utils.dom.HTML_NS, 'textarea');
  var textarea = this.textarea_;
  textarea.className = 'blocklyCommentTextarea';
  textarea.setAttribute('dir', this.block_.RTL ? 'RTL' : 'LTR');
  textarea.value = this.model_.text;
  //this.resizeTextarea_(); // ORG // COMMENTED // CASS_PXT

  // CASS_PXT // ADDED
  if (!this.block_.isEditable()) {
    textarea.setAttribute('readonly', true);
  }

  body.appendChild(textarea);
  this.foreignObject_.appendChild(body);

  // Ideally this would be hooked to the focus event for the comment.
  // However doing so in Firefox swallows the cursor for unknown reasons.
  // So this is hooked to mouseup instead.  No big deal.

  if (this.block_.isEditable()) {
    // CASS_PXT // ADDED this line only

    this.onMouseUpWrapper_ = Blockly.browserEvents.conditionalBind(
      textarea,
      'mouseup',
      this,
      this.startEdit_,
      true,
      true
    );
    // Don't zoom with mousewheel.
    this.onWheelWrapper_ = Blockly.browserEvents.conditionalBind(textarea, 'wheel', this, function (e) {
      e.stopPropagation();
    });
    this.onChangeWrapper_ = Blockly.browserEvents.conditionalBind(textarea, 'change', this, function (_e) {
      if (this.cachedText_ != this.model_.text) {
        Blockly.Events.fire(
          new (Blockly.Events.get(Blockly.Events.BLOCK_CHANGE))(
            this.block_,
            'comment',
            null,
            this.cachedText_,
            this.model_.text
          )
        );
      }
    });
    this.onInputWrapper_ = Blockly.browserEvents.conditionalBind(textarea, 'input', this, function (_e) {
      this.model_.text = textarea.value;
    });

    setTimeout(textarea.focus.bind(textarea), 0);
  } // CASS_PXT // ADDED this line only

  return this.foreignObject_;
};

///////////////////////////////////////////////////////////////////////// CASS_PXT // ADDED
/**
 * PXT Blockly: Create the minimize toggle and delete icons that in the comment top bar.
 * @private
 */
Blockly.Comment.prototype.createTopBarIcons_ = function () {
  var topBarMiddleY = Blockly.WorkspaceCommentSvg.TOP_BAR_HEIGHT / 2 + Blockly.WorkspaceCommentSvg.BORDER_WIDTH;

  // Minimize Toggle Icon in Comment Top Bar
  var xInset = Blockly.WorkspaceCommentSvg.TOP_BAR_ICON_INSET;
  this.minimizeArrow_ = Blockly.utils.dom.createSvgElement(
    'image',
    {
      x: xInset + 4,
      y: topBarMiddleY - Blockly.WorkspaceCommentSvg.MINIMIZE_ICON_SIZE / 2,
      width: Blockly.WorkspaceCommentSvg.MINIMIZE_ICON_SIZE,
      height: Blockly.WorkspaceCommentSvg.MINIMIZE_ICON_SIZE
    },
    this.svgGroup_
  );
  this.minimizeArrow_.setAttributeNS(
    'http://www.w3.org/1999/xlink',
    //'xlink:href', Blockly.mainWorkspace.options.pathToMedia + 'comment-arrow-down.svg');
    //'xlink:href', this.block_.workspace.options.pathToMedia + 'comment-arrow-down.svg');
    //'xlink:href', '/data/images/comment-arrow-down.svg');
    'xlink:href',
    '/p003_polyade/img/blockcode/comment/down-arrow.svg'
  );

  //this.minimizeArrow_.setAttributeNS(Blockly.utils.dom.XLINK_NS, 'xlink:href',
  //    'media/comment-arrow-down.svg');
  //this.constants_.FIELD_DROPDOWN_SVG_ARROW_DATAURI);

  // Delete Icon in Comment Top Bar
  this.deleteIcon_ = Blockly.utils.dom.createSvgElement(
    'g',
    {
      class: 'blocklyCommentDeleteIcon'
    },
    this.svgGroup_
  );
  Blockly.utils.dom.createSvgElement(
    'rect',
    {
      x: '-12.5',
      y: '1',
      width: '27.5',
      height: '27.5',
      fill: 'transparent',
      class: 'blocklyDeleteIconShape'
    },
    this.deleteIcon_
  );
  Blockly.WorkspaceCommentSvg.drawDeleteIcon(this.deleteIcon_);
};

/**
 * PXT Blockly: Handle a mouse-down on comment's delete icon.
 * @param {!Event} e Mouse down event.
 * @private
 */
Blockly.Comment.prototype.deleteMouseDown_ = function (e) {
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
};

/**
 * PXT Blockly: Handle a mouse-up on comment's delete icon.
 * @param {!Event} e Mouse up event.
 * @private
 */
Blockly.Comment.prototype.deleteMouseUp_ = function (e) {
  // Delete this comment
  this.block_.setCommentText(null);
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
  // pxt-blockly: clear touch identifier set by mousedown
  Blockly.Touch.clearTouchIdentifier();
};

/**
 * PXT Blockly: Handle a mouse-up on comment's minimize icon.
 * @param {!Event} e Mouse up event.
 * @private
 */
Blockly.Comment.prototype.minimizeMouseUp_ = function (e) {
  // Minimize this comment
  this.block_.comment.setVisible(false);
  // This event has been handled.  No need to bubble up to the document.
  e.stopPropagation();
  // pxt-blockly: clear touch identifier set by mousedown
  Blockly.Touch.clearTouchIdentifier();
};
///////////////////////////////////////////////////////////////////////// CASS_PXT // ADDED

/**
 * Add or remove editability of the comment.
 * @override
 */
Blockly.Comment.prototype.updateEditable = function () {
  Blockly.Comment.superClass_.updateEditable.call(this);
  if (this.isVisible()) {
    // Recreate the bubble with the correct UI.
    this.disposeBubble_();
    this.createBubble_();
  }
};

/**
 * Callback function triggered when the bubble has resized.
 * Resize the text area accordingly.
 * @private
 */
Blockly.Comment.prototype.onBubbleResize_ = function () {
  if (!this.isVisible()) {
    return;
  }
  this.model_.size = this.bubble_.getBubbleSize();
  this.resizeTextarea_();
};

/**
 * Resizes the text area to match the size defined on the model (which is
 * the size of the bubble).
 * @private
 */
Blockly.Comment.prototype.resizeTextarea_ = function () {
  // ORG
  //var size = this.model_.size;
  //var doubleBorderWidth = 2 * Blockly.Bubble.BORDER_WIDTH;
  //var widthMinusBorder = size.width - doubleBorderWidth;
  //var heightMinusBorder = size.height - doubleBorderWidth;
  //this.foreignObject_.setAttribute('width', widthMinusBorder);
  //this.foreignObject_.setAttribute('height', heightMinusBorder);
  //this.textarea_.style.width = (widthMinusBorder - 4) + 'px';
  //this.textarea_.style.height = (heightMinusBorder - 4) + 'px';

  // CASS_PXT
  // pxt-blockly: custom resize
  var size = this.model_.size;
  var doubleBorderWidth = 2 * Blockly.Bubble.BORDER_WIDTH;
  var topBarHeight = Blockly.WorkspaceCommentSvg.TOP_BAR_HEIGHT;
  this.foreignObject_.setAttribute('width', Math.max(size.width - doubleBorderWidth, 0));
  this.foreignObject_.setAttribute('height', Math.max(size.height - doubleBorderWidth - topBarHeight, 0)); // PXT Blockly: add space for top bar height
  this.textarea_.style.width = size.width - doubleBorderWidth - 4 + 'px';
  this.textarea_.style.height = size.height - doubleBorderWidth - topBarHeight - 4 + 'px'; // PXT Blockly: add space for top bar height

  // PXT Blockly: handle minimize and delete icons
  if (this.RTL) {
    this.minimizeArrow_.setAttribute(
      'x',
      size.width - Blockly.WorkspaceCommentSvg.MINIMIZE_ICON_SIZE - Blockly.WorkspaceCommentSvg.TOP_BAR_ICON_INSET
    );
    this.minimizeArrow_.setAttribute('transform', 'translate(' + -size.width + ', 1)');
    this.deleteIcon_.setAttribute(
      'transform',
      'translate(' +
        (-size.width + Blockly.WorkspaceCommentSvg.DELETE_ICON_SIZE + Blockly.WorkspaceCommentSvg.TOP_BAR_ICON_INSET) +
        ',' +
        0 +
        ') scale(-1 1)'
    );
  } else {
    this.deleteIcon_.setAttribute(
      'transform',
      'translate(' +
        (size.width - Blockly.WorkspaceCommentSvg.DELETE_ICON_SIZE - Blockly.WorkspaceCommentSvg.TOP_BAR_ICON_INSET) +
        ',' +
        0 +
        ')'
    );
  }
};

/**
 * Show or hide the comment bubble.
 * @param {boolean} visible True if the bubble should be visible.
 */
Blockly.Comment.prototype.setVisible = function (visible) {
  if (visible == this.isVisible()) {
    return;
  }
  Blockly.Events.fire(new (Blockly.Events.get(Blockly.Events.BUBBLE_OPEN))(this.block_, visible, 'comment'));
  this.model_.pinned = visible;
  if (visible) {
    this.createBubble_();
    //this.model_.xy = this.getRelativePosition(); // CASS_PXT // ADDED // COMMENTED
  } else {
    this.model_.xy = this.getRelativePosition(); // CASS_PXT // ADDED
    this.disposeBubble_();
  }
};

// CASS_PXT // ADDED
/**
 * Set the position of the comment relative to the block
 * @param {Blockly.utils.Coordinate} coord coordinate of position
 */
Blockly.Comment.prototype.setRelativePosition = function (coord) {
  if (coord != undefined && coord != null) {
    this.model_.xy = coord;
    if (this.bubble_) {
      this.bubble_.relativeLeft_ = coord.x;
      this.bubble_.relativeTop_ = coord.y;
      this.bubble_.positionBubble_();
      this.bubble_.renderArrow_();
    }
  }
};

// CASS_PXT // ADDED
/**
 * Get position of comment relative to block
 * @return {Blockly.utils.Coordinate} xy coordinate of position
 */
Blockly.Comment.prototype.getRelativePosition = function () {
  if (this.bubble_) {
    return new Blockly.utils.Coordinate(this.bubble_.relativeLeft_, this.bubble_.relativeTop_);
  } else {
    return this.model_.xy;
  }
};

/**
 * Show the bubble. Handles deciding if it should be editable or not.
 * @private
 */
Blockly.Comment.prototype.createBubble_ = function () {
  //if (!this.block_.isEditable() || Blockly.utils.userAgent.IE) { // ORG

  if (Blockly.utils.userAgent.IE) {
    // CASS_PXT

    // MSIE does not support foreignobject; textareas are impossible.
    // https://docs.microsoft.com/en-us/openspecs/ie_standards/ms-svg/56e6e04c-7c8c-44dd-8100-bd745ee42034
    // Always treat comments in IE as uneditable.
    this.createNonEditableBubble_();
  } else {
    this.createEditableBubble_();
  }
};

/**
 * Show an editable bubble.
 * @private
 */
Blockly.Comment.prototype.createEditableBubble_ = function () {
  this.bubble_ = new Blockly.Bubble(
    /** @type {!Blockly.WorkspaceSvg} */ (this.block_.workspace),
    this.createEditor_(),
    this.block_.pathObject.svgPath,
    /** @type {!Blockly.utils.Coordinate} */ (this.iconXY_),
    this.model_.size.width,
    this.model_.size.height
  );
  // Expose this comment's block's ID on its top-level SVG group.
  this.bubble_.setSvgId(this.block_.id);
  this.bubble_.registerResizeEvent(this.onBubbleResize_.bind(this));
  this.applyColour();

  this.setRelativePosition(this.model_.xy); // CASS_PXT // ADDED
};

/**
 * Show a non-editable bubble.
 * @private
 * @suppress {checkTypes} Suppress `this` type mismatch.
 */
Blockly.Comment.prototype.createNonEditableBubble_ = function () {
  // TODO (#2917): It would be great if the comment could support line breaks.
  this.paragraphElement_ = Blockly.Bubble.textToDom(this.block_.getCommentText());
  this.bubble_ = Blockly.Bubble.createNonEditableBubble(
    this.paragraphElement_,
    /** @type {!Blockly.BlockSvg} */ (this.block_),
    /** @type {!Blockly.utils.Coordinate} */ (this.iconXY_)
  );
  this.applyColour();
};

/**
 * Dispose of the bubble.
 * @private
 * @suppress {checkTypes} Suppress `this` type mismatch.
 */
Blockly.Comment.prototype.disposeBubble_ = function () {
  if (this.onMouseUpWrapper_) {
    Blockly.browserEvents.unbind(this.onMouseUpWrapper_);
    this.onMouseUpWrapper_ = null;
  }
  if (this.onWheelWrapper_) {
    Blockly.browserEvents.unbind(this.onWheelWrapper_);
    this.onWheelWrapper_ = null;
  }
  if (this.onChangeWrapper_) {
    Blockly.browserEvents.unbind(this.onChangeWrapper_);
    this.onChangeWrapper_ = null;
  }
  if (this.onInputWrapper_) {
    Blockly.browserEvents.unbind(this.onInputWrapper_);
    this.onInputWrapper_ = null;
  }
  this.bubble_.dispose();
  this.bubble_ = null;
  this.textarea_ = null;
  this.foreignObject_ = null;
  this.paragraphElement_ = null;
};

/**
 * Callback fired when an edit starts.
 *
 * Bring the comment to the top of the stack when clicked on. Also cache the
 * current text so it can be used to fire a change event.
 * @param {!Event} _e Mouse up event.
 * @private
 */
Blockly.Comment.prototype.startEdit_ = function (_e) {
  if (this.bubble_.promote()) {
    // Since the act of moving this node within the DOM causes a loss of focus,
    // we need to reapply the focus.
    this.textarea_.focus();
  }

  this.cachedText_ = this.model_.text;
};

/**
 * Get the dimensions of this comment's bubble.
 * @return {Blockly.utils.Size} Object with width and height properties.
 */
Blockly.Comment.prototype.getBubbleSize = function () {
  return this.model_.size;
};

/**
 * Size this comment's bubble.
 * @param {number} width Width of the bubble.
 * @param {number} height Height of the bubble.
 */
Blockly.Comment.prototype.setBubbleSize = function (width, height) {
  if (this.bubble_) {
    this.bubble_.setBubbleSize(width, height);
  } else {
    this.model_.size.width = width;
    this.model_.size.height = height;
  }
};

/**
 * Update the comment's view to match the model.
 * @package
 */
Blockly.Comment.prototype.updateText = function () {
  if (this.textarea_) {
    this.textarea_.value = this.model_.text;
  } else if (this.paragraphElement_) {
    // Non-Editable mode.
    // TODO (#2917): If 2917 gets added this will probably need to be updated.
    this.paragraphElement_.firstChild.textContent = this.model_.text;
  }
};

/**
 * Dispose of this comment.
 *
 * If you want to receive a comment "delete" event (newValue: null), then this
 * should not be called directly. Instead call block.setCommentText(null);
 */
Blockly.Comment.prototype.dispose = function () {
  this.block_.comment = null;
  Blockly.Icon.prototype.dispose.call(this);
};

/**
 * CSS for block comment.  See css.js for use.
 */
// ORG
//Blockly.Css.register([
//  /* eslint-disable indent */
//  '.blocklyCommentTextarea {',
//    'background-color: #fef49c;',
//    'border: 0;',
//    'outline: 0;',
//    'margin: 0;',
//    'padding: 3px;',
//    'resize: none;',
//    'display: block;',
//    'text-overflow: hidden;',
//  '}'
//  /* eslint-enable indent */
//]);

// CASS_PXT
Blockly.Css.register([
  /* eslint-disable indent */
  '.blocklyCommentTextarea {',
  //'background-color: #FAF6BD;',
  'background-color: #f1f1f1;',
  'border: 0;',
  'outline: 0;',
  'margin: 2px;',
  'padding: 3px;',
  'resize: none;',
  'display: block;',
  'color: $colour_text;',
  'overflow-x: hidden;',
  'overflow-y: scroll;',
  'font-size: 12pt;',
  'line-height: 22px;',
  "font: 400 10.5pt 'Noto Sans KR', sans-serif;",
  //"min-height: 60px;",
  '}'
  /* eslint-enable indent */
]);

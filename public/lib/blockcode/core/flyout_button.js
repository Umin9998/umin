/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Class for a button in the flyout.
 * @author fenichel@google.com (Rachel Fenichel)
 */
'use strict';

goog.provide('Blockly.FlyoutButton');

goog.require('Blockly.browserEvents');
goog.require('Blockly.Css');
goog.require('Blockly.utils');
goog.require('Blockly.utils.Coordinate');
goog.require('Blockly.utils.dom');
goog.require('Blockly.utils.Svg');

goog.requireType('Blockly.utils.toolbox');
goog.requireType('Blockly.WorkspaceSvg');


/**
 * Class for a button in the flyout.
 * @param {!Blockly.WorkspaceSvg} workspace The workspace in which to place this
 *     button.
 * @param {!Blockly.WorkspaceSvg} targetWorkspace The flyout's target workspace.
 * @param {!Blockly.utils.toolbox.ButtonOrLabelInfo} json
 *    The JSON specifying the label/button.
 * @param {boolean} isLabel Whether this button should be styled as a label.
 * @constructor
 * @package
 */
Blockly.FlyoutButton = function(workspace, targetWorkspace, json, isLabel) {
  // Labels behave the same as buttons, but are styled differently.

  /**
   * @type {!Blockly.WorkspaceSvg}
   * @private
   */
  this.workspace_ = workspace;

  /**
   * @type {!Blockly.WorkspaceSvg}
   * @private
   */
  this.targetWorkspace_ = targetWorkspace;

  /**
   * @type {string}
   * @private
   */
  this.text_ = json['text'];

  /**
   * @type {!Blockly.utils.Coordinate}
   * @private
   */
  this.position_ = new Blockly.utils.Coordinate(0, 0);

  /**
   * Whether this button should be styled as a label.
   * @type {boolean}
   * @private
   */
  this.isLabel_ = isLabel;

  /**
   * The key to the function called when this button is clicked.
   * @type {string}
   * @private
   */
  this.callbackKey_ = json['callbackKey'] ||
  /* Check the lower case version too to satisfy IE */
                      json['callbackkey'];

  /**
   * If specified, a CSS class to add to this button.
   * @type {?string}
   * @private
   */
  this.cssClass_ = json['web-class'] || null;

  /**
   * Mouse up event data.
   * @type {?Blockly.browserEvents.Data}
   * @private
   */
  this.onMouseUpWrapper_ = null;

  /**
   * The JSON specifying the label / button.
   * @type {!Blockly.utils.toolbox.ButtonOrLabelInfo}
   */
  this.info = json;

  // CASS_ADDED
  this.link_ = json['link'] || null;
};

/**
 * The horizontal margin around the text in the button.
 */
Blockly.FlyoutButton.MARGIN_X = 5;

/**
 * The vertical margin around the text in the button.
 */
Blockly.FlyoutButton.MARGIN_Y = 2;

/**
 * The width of the button's rect.
 * @type {number}
 */
Blockly.FlyoutButton.prototype.width = 0;

/**
 * The height of the button's rect.
 * @type {number}
 */
Blockly.FlyoutButton.prototype.height = 0;

/**
 * Create the button elements.
 * @return {!SVGElement} The button's SVG group.
 */
// ORG
/*
Blockly.FlyoutButton.prototype.createDom = function() {
  var cssClass = this.isLabel_ ? 'blocklyFlyoutLabel' : 'blocklyFlyoutButton';
  if (this.cssClass_) {
    cssClass += ' ' + this.cssClass_;
  }

  this.svgGroup_ = Blockly.utils.dom.createSvgElement(
      Blockly.utils.Svg.G, {'class': cssClass},
      this.workspace_.getCanvas());

  if (!this.isLabel_) {
    // Shadow rectangle (light source does not mirror in RTL).
    var shadow = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.RECT,
        {
          'class': 'blocklyFlyoutButtonShadow',
          'rx': 4, 'ry': 4, 'x': 1, 'y': 1
        },
        this.svgGroup_);
  }
  // Background rectangle.
  var rect = Blockly.utils.dom.createSvgElement(
      Blockly.utils.Svg.RECT,
      {
        'class': this.isLabel_ ?
            'blocklyFlyoutLabelBackground' : 'blocklyFlyoutButtonBackground',
        'rx': 4, 'ry': 4
      },
      this.svgGroup_);

  var svgText = Blockly.utils.dom.createSvgElement(
      Blockly.utils.Svg.TEXT,
      {
        'class': this.isLabel_ ? 'blocklyFlyoutLabelText' : 'blocklyText',
        'x': 0,
        'y': 0,
        'text-anchor': 'middle'
      },
      this.svgGroup_);
  var text = Blockly.utils.replaceMessageReferences(this.text_);
  if (this.workspace_.RTL) {
    // Force text to be RTL by adding an RLM.
    text += '\u200F';
  }
  svgText.textContent = text;
  if (this.isLabel_) {
    this.svgText_ = svgText;
    this.workspace_.getThemeManager().subscribe(this.svgText_,
        'flyoutForegroundColour', 'fill');
  }

  var fontSize = Blockly.utils.style.getComputedStyle(svgText, 'fontSize');
  var fontWeight = Blockly.utils.style.getComputedStyle(svgText, 'fontWeight');
  var fontFamily = Blockly.utils.style.getComputedStyle(svgText, 'fontFamily');
  this.width = Blockly.utils.dom.getFastTextWidthWithSizeString(svgText,
      fontSize, fontWeight, fontFamily);
  var fontMetrics = Blockly.utils.dom.measureFontMetrics(text, fontSize,
      fontWeight, fontFamily);
  this.height = fontMetrics.height;

  if (!this.isLabel_) {
    this.width += 2 * Blockly.FlyoutButton.MARGIN_X;
    this.height += 2 * Blockly.FlyoutButton.MARGIN_Y;
    shadow.setAttribute('width', this.width);
    shadow.setAttribute('height', this.height);
  }
  rect.setAttribute('width', this.width);
  rect.setAttribute('height', this.height);

  svgText.setAttribute('x', this.width / 2);
  svgText.setAttribute('y', this.height / 2 - fontMetrics.height / 2 +
      fontMetrics.baseline);

  this.updateTransform_();

  this.onMouseUpWrapper_ = Blockly.browserEvents.conditionalBind(
      this.svgGroup_, 'mouseup', this, this.onMouseUp_);
  return this.svgGroup_;
};
*/


Blockly.FlyoutButton.prototype.createDom = function () {

    // CASS_ADDED // when it's not included it's null
    var link_ = '';
    if (link_ != undefined && link_ != null && link_ != '') {
        link_ = this.link_;
    }

    var cssClass = this.isLabel_ ? 'blocklyFlyoutLabel' : 'blocklyFlyoutButton';
    if (this.cssClass_) {
        cssClass += ' ' + this.cssClass_;
    }

    this.svgGroup_ = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.G, { 'class': cssClass },
        this.workspace_.getCanvas());

    if (!this.isLabel_) {
        // Shadow rectangle (light source does not mirror in RTL).
        var shadow = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.RECT,
            {
                'class': 'blocklyFlyoutButtonShadow',
                //'rx': 4, 'ry': 4, 'x': 1, 'y': 1 // ORG
                'rx': 4, 'ry': 4, 'x': 0, 'y': 0 // CASS
            },
            this.svgGroup_);
    }
    // Background rectangle.
    var rect = Blockly.utils.dom.createSvgElement(
        Blockly.utils.Svg.RECT,
        {
            'class': this.isLabel_ ?
                'blocklyFlyoutLabelBackground' : 'blocklyFlyoutButtonBackground',
            'rx': 4, 'ry': 4,
            'x': 1, 'y': 1, // CASS_ADDED
            //'cursor': 'default' // CASS_ADDED
        },
        this.svgGroup_);

    //var test = this.text_.indexOf("|"); // do not use search!

    // CASS
    // https://www.w3schools.com/jsref/jsref_split.asp
    var textTokeninzed;
    var textByRef;

    var svgTextTokenized;

    if (this.text_.indexOf("|") != -1) {

        textTokeninzed = this.text_.split("|"); // CASS_2021

        var _xSum = 0;
        var _xLeftMargin = 7.5;

        for (var _i = 0; _i < textTokeninzed.length; _i++) {

            textTokeninzed[_i] = textTokeninzed[_i].trim();

            //if (textTokeninzed[_i] == "") {
            //    continue;
            //}

            textByRef = Blockly.utils.replaceMessageReferences(textTokeninzed[_i]);

            if (_i != textTokeninzed.length - 1) {
                textByRef = " " + textByRef + " |";
            }
            else {
                textByRef = " " + textByRef;
            }

            svgTextTokenized = Blockly.utils.dom.createSvgElement(
                Blockly.utils.Svg.TEXT,
                {
                    'class': this.isLabel_ ? 'blocklyFlyoutLabelText' : 'blocklyText cls_acs_block_flyout_quick_location',
                    'x': 0,
                    'y': 0,
                    'text-anchor': 'middle',
                    //'cursor': 'pointer', // CASS_ADDED
                    'onclick': 'acc.block.flyout.' + this.callbackKey_ + '_' + _i + '();' // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/onclick
                },
                this.svgGroup_);

            svgTextTokenized.textContent = textByRef;

            //P
            var fontSize = Blockly.utils.style.getComputedStyle(svgTextTokenized, 'fontSize');
            var fontWeight = Blockly.utils.style.getComputedStyle(svgTextTokenized, 'fontWeight');
            var fontFamily = Blockly.utils.style.getComputedStyle(svgTextTokenized, 'fontFamily');
            this.width = Blockly.utils.dom.getFastTextWidthWithSizeString(svgTextTokenized,
                fontSize, fontWeight, fontFamily);
            var fontMetrics = Blockly.utils.dom.measureFontMetrics(textByRef, fontSize,
                fontWeight, fontFamily);
            this.height = fontMetrics.height + 14;

            var _x = this.width / 2;

            _xSum += _x;

            svgTextTokenized.setAttribute('x', _xSum + _xLeftMargin); // CASS

            //svgTextTokenized.setAttribute('y', this.height / 2 - fontMetrics.height / 2 +
            //    fontMetrics.baseline + 1); // Y POSITION

            svgTextTokenized.setAttribute('y', this.height / 2 - fontMetrics.height / 2 +
                fontMetrics.baseline + 1.5); // Y POSITION

            _xSum += _x;

        } // for

        //this.width += 6 * 2; // CASS_ADDED

        if (!this.isLabel_) {
            this.width += 2 * Blockly.FlyoutButton.MARGIN_X;
            this.height += 2 * Blockly.FlyoutButton.MARGIN_Y;
            // ORG
            //shadow.setAttribute('width', this.width);
            //shadow.setAttribute('height', this.height);
            // CASS
            //shadow.setAttribute('width', this.width + (10 * 2 * textTokeninzed.length) + 2 + (textTokeninzed.length * 7));
            shadow.setAttribute('width', _xSum + _xLeftMargin * 2 + 2);
            shadow.setAttribute('height', this.height + 2);
        }
        // ORG
        //rect.setAttribute('width', this.width);
        //rect.setAttribute('height', this.height);
        // CASS
        //this.width += (10 * 2 * textTokeninzed.length) + (textTokeninzed.length * 7); // CASS_ADDED
        //rect.setAttribute('width', this.width);
        rect.setAttribute('width', _xSum + _xLeftMargin * 2);
        rect.setAttribute('height', this.height);

        this.width = _xSum + _xLeftMargin * 2 + 2; // for the actual flyout width // -> Blockly.VerticalFlyout.prototype.reflowInternal_ in flyout_vertical.js -> flyoutWidth = Math.max(flyoutWidth, button.width);
    }
    else {

        // CASS_ADDED
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/a
        var svgGroupAlt = this.svgGroup_;
        var svgLink;
        if (link_ != '') {
            svgLink = Blockly.utils.dom.createSvgElement(
                Blockly.utils.Svg.LINK,
                {
                    'href': link_
                },
                this.svgGroup_);

            svgGroupAlt = svgLink;
        }

        var svgText = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.TEXT,
            {
                'class': this.isLabel_ ? 'blocklyFlyoutLabelText' : 'blocklyText',
                'x': 0,
                'y': 0,
                'text-anchor': 'middle'
            },
            //this.svgGroup_); // ORG
            svgGroupAlt); // CASS

        var text = Blockly.utils.replaceMessageReferences(this.text_);
        if (this.workspace_.RTL) {
            // Force text to be RTL by adding an RLM.
            text += '\u200F';
        }
        svgText.textContent = text;
        if (this.isLabel_) {
            this.svgText_ = svgText;
            this.workspace_.getThemeManager().subscribe(this.svgText_,
                'flyoutForegroundColour', 'fill');
        }

        var fontSize = Blockly.utils.style.getComputedStyle(svgText, 'fontSize');
        var fontWeight = Blockly.utils.style.getComputedStyle(svgText, 'fontWeight');
        var fontFamily = Blockly.utils.style.getComputedStyle(svgText, 'fontFamily');
        this.width = Blockly.utils.dom.getFastTextWidthWithSizeString(svgText,
            fontSize, fontWeight, fontFamily);
        var fontMetrics = Blockly.utils.dom.measureFontMetrics(text, fontSize,
            fontWeight, fontFamily);
        //this.height = fontMetrics.height; // ORG
        this.height = fontMetrics.height + 14; // CASS_BLOCKLY_MODIFIED // Create Variable BTN

        //this.width += 6 * 2; // CASS_ADDED

        if (!this.isLabel_) {
            this.width += 2 * Blockly.FlyoutButton.MARGIN_X;
            this.height += 2 * Blockly.FlyoutButton.MARGIN_Y;
            // ORG
            //shadow.setAttribute('width', this.width);
            //shadow.setAttribute('height', this.height);
            // CASS
            shadow.setAttribute('width', this.width + (6 * 2) + 2);
            shadow.setAttribute('height', this.height + 2);
        }
        // ORG
        //rect.setAttribute('width', this.width);
        //rect.setAttribute('height', this.height);
        // CASS
        this.width += 6 * 2; // CASS_ADDED
        rect.setAttribute('width', this.width);
        rect.setAttribute('height', this.height);

        //svgText.setAttribute('x', this.width / 2); // ORG
        svgText.setAttribute('x', this.width / 2); // CASS
        // ORG
        //svgText.setAttribute('y', this.height / 2 - fontMetrics.height / 2 +
        //    fontMetrics.baseline);
        // CASS
        //svgText.setAttribute('y', this.height / 2 - fontMetrics.height / 2 +
        //    fontMetrics.baseline - 8); // CASS_BLOCKLY_MODIFIED
        //svgText.setAttribute('y', this.height / 2 - fontMetrics.height / 2 +
        //    fontMetrics.baseline); // CASS_BLOCKLY_MODIFIED // Y POSITION
        svgText.setAttribute('y', this.height / 2 - fontMetrics.height / 2 +
            fontMetrics.baseline + 0.3); // CASS_BLOCKLY_MODIFIED // Y POSITION

        this.updateTransform_();

        this.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(
            this.svgGroup_, 'mouseup', this, this.onMouseUp_);
        return this.svgGroup_;

    }

    this.updateTransform_();

    this.onMouseUpWrapper_ = Blockly.bindEventWithChecks_(
        this.svgGroup_, 'mouseup', this, this.onMouseUp_);
    return this.svgGroup_;
};


/**
 * Correctly position the flyout button and make it visible.
 */
Blockly.FlyoutButton.prototype.show = function() {
  this.updateTransform_();
  this.svgGroup_.setAttribute('display', 'block');
};

/**
 * Update SVG attributes to match internal state.
 * @private
 */
Blockly.FlyoutButton.prototype.updateTransform_ = function() {
  this.svgGroup_.setAttribute('transform',
      'translate(' + this.position_.x + ',' + this.position_.y + ')');
};

/**
 * Move the button to the given x, y coordinates.
 * @param {number} x The new x coordinate.
 * @param {number} y The new y coordinate.
 */
Blockly.FlyoutButton.prototype.moveTo = function(x, y) {
  this.position_.x = x;
  this.position_.y = y;
  this.updateTransform_();
};

/**
 * @return {boolean} Whether or not the button is a label.
 */
Blockly.FlyoutButton.prototype.isLabel = function() {
  return this.isLabel_;
};

/**
 * Location of the button.
 * @return {!Blockly.utils.Coordinate} x, y coordinates.
 * @package
 */
Blockly.FlyoutButton.prototype.getPosition = function() {
  return this.position_;
};

/**
 * @return {string} Text of the button.
 */
Blockly.FlyoutButton.prototype.getButtonText = function() {
  return this.text_;
};

/**
 * Get the button's target workspace.
 * @return {!Blockly.WorkspaceSvg} The target workspace of the flyout where this
 *     button resides.
 */
Blockly.FlyoutButton.prototype.getTargetWorkspace = function() {
  return this.targetWorkspace_;
};

/**
 * Dispose of this button.
 */
Blockly.FlyoutButton.prototype.dispose = function() {
  if (this.onMouseUpWrapper_) {
    Blockly.browserEvents.unbind(this.onMouseUpWrapper_);
  }
  if (this.svgGroup_) {
    Blockly.utils.dom.removeNode(this.svgGroup_);
  }
  if (this.svgText_) {
    this.workspace_.getThemeManager().unsubscribe(this.svgText_);
  }
};

/**
 * Do something when the button is clicked.
 * @param {!Event} e Mouse up event.
 * @private
 */
Blockly.FlyoutButton.prototype.onMouseUp_ = function(e) {
  var gesture = this.targetWorkspace_.getGesture(e);
  if (gesture) {
    gesture.cancel();
  }

  if (this.isLabel_ && this.callbackKey_) {
    console.warn('Labels should not have callbacks. Label text: ' + this.text_);
  } else if (!this.isLabel_ && !(this.callbackKey_ &&
      this.targetWorkspace_.getButtonCallback(this.callbackKey_))) {
    console.warn('Buttons should have callbacks. Button text: ' + this.text_);
  } else if (!this.isLabel_) {
    this.targetWorkspace_.getButtonCallback(this.callbackKey_)(this);
  }
};

/**
 * CSS for buttons and labels.  See css.js for use.
 */
Blockly.Css.register([
  /* eslint-disable indent */
  '.blocklyFlyoutButton {',
    //'fill: #888;', // ORG
    'fill: #a55b80;', // #f48b3a // #ff9d49 // #888 // CASS_BLOCKLY_MODIFIED // Create variable
    'cursor: default;',
  '}',

  '.blocklyFlyoutButtonShadow {',
    'fill: #666;',
  '}',

  '.blocklyFlyoutButton:hover {',
    'fill: #aaa;',
  '}',

  '.blocklyFlyoutLabel {',
    'cursor: default;',
  '}',

  '.blocklyFlyoutLabelBackground {',
    'opacity: 0;',
  '}',
  /* eslint-enable indent */
]);

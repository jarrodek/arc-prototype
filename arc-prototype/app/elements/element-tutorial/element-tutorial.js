Polymer({
  is: 'element-tutorial',

  properties: {
    // A target element that will be visible on screen.
    target: HTMLElement,
    hidden: {
      type: Boolean,
      value: true,
      reflectToAttribute: true
    },
    // True when the tutorial has been opened
    opened: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
      notify: true
    }
  },

  observers: [
    '_targetChanged(target)'
  ],

  _targetChanged: function(target) {
    if (!target) {
      this.hidden = true;
      return;
    }
    this._scheduleOpen();
  },

  _scheduleOpen: function(time) {
    time = time || 3000;
    if (!this.target) {
      return;
    }
    this.async(function() {
      if (this.otherOpened) {
        return;
      }
      this.hidden = false;
      this.updateSizing(this.target);
    }, time);
  },

  attached: function() {
    this.listen(window, 'resize', '_onResize');
    this.listen(document.body, 'tutorial-open', '_tutorialOpened');
    this.listen(document.body, 'tutorial-close', '_tutorialClosed');
  },

  detached: function() {
    this.unlisten(window, 'resize', '_onResize');
    this.unlisten(document.body, 'tutorial-open', '_tutorialOpened');
    this.unlisten(document.body, 'tutorial-close', '_tutorialClosed');
  },

  updateSizing: function(target) {
    target = target || this.target;
    if (!target) {
      this.hidden = true;
      return;
    }
    var rect = target.getBoundingClientRect();
    // var style = window.getComputedStyle(this, ':before');
    var size = Math.max(rect.width, rect.height) + 24;
    var size2 = size / 2;
    var left = rect.left - 12;
    var top = rect.top - size2;
    if (top < 12) {
      top = 12;
    }
    var iw = window.innerWidth;
    var radius = iw + Math.abs(iw - left) + size;

    this._targetTop = top;
    this._targetLeft = left;
    this._targetSize = size;

    this.customStyle['--element-tutorial-top'] = top + 'px';
    this.customStyle['--element-tutorial-left'] = left + 'px';
    this.customStyle['--element-tutorial-width'] = size + 'px';
    this.customStyle['--element-tutorial-height'] = size + 'px';
    this.customStyle['--element-tutorial-radius'] = radius + 'px';

    this.positionTutorial();
    this.updateStyles();

    this.async(function() {
      if (this.otherOpened) {
        return;
      }
      this.opened = true;
      this.fire('tutorial-open');
    }, 500);
  },

  positionTutorial: function() {
    var children = this.getEffectiveChildren();
    if (!children || children.length === 0) {
      return;
    }
    var rect = children[0].getBoundingClientRect();
    var wHeight = window.innerHeight;
    var wWidth = window.innerWidth;
    var tWidth = rect.width;
    var tHeight = rect.height;
    // Try position -x, -y (south west)
    var left = this._targetLeft - tWidth;
    var top = this._targetTop + this._targetSize + tHeight;
    var canFitTop = false;
    var canFitLeft = false;
    // debugger;
    if (left > 0 && left + tWidth < wWidth) {
      canFitLeft = true;
    }
    if (top > 0 && top + tHeight < wHeight) {
      canFitTop = true;
    }
    if (canFitTop && canFitLeft) {
      this.customStyle['--element-tutorial-content-top'] = top + 'px';
      this.customStyle['--element-tutorial-content-left'] = left + 'px';
      return;
    } else if (canFitTop) {
      left = 24;
      this.customStyle['--element-tutorial-content-top'] = top + 'px';
      this.customStyle['--element-tutorial-content-left'] = left + 'px';
      return;
    }
  },

  _onResize: function() {
    if (this.hidden || !this.opened) {
      return;
    }
    this.updateSizing();
  },

  hide: function() {
    this.opened = false;
    this.customStyle['--element-tutorial-radius'] = '0px';
    //this.customStyle['--element-tutorial-width'] = '0px';
    //this.customStyle['--element-tutorial-height'] = '0px';
    this.updateStyles();
    this.async(function() {
      this.hidden = true;
      this.fire('tutorial-close');
    }, 1000);
  },

  _tutorialOpened: function() {
    this.otherOpened = true;
  },

  _tutorialClosed: function(e) {
    this.otherOpened = false;
    if (e.target === this) {
      return;
    }
    this._scheduleOpen(2000);
  }
});

Polymer({
  is: 'masked-password-input',

  properties: {
    value: {
      type: String,
      notify: true
    },

    visible: {
      type: Boolean,
      value: false,
      notify: true
    },

    // Icon name to display
    icon: {
      type: String,
      value: 'visibility',
      readOnly: true
    },

    // Input field type
    type: {
      type: String,
      value: 'password',
      readOnly: true
    }
  },

  observers: [
    '_visibleChanged(visible)'
  ],

  toggle: function() {
    this.set('visible', !this.visible);
  },

  _visibleChanged: function(visible) {
    if (visible) {
      this._setType('text');
      this._setIcon('visibility-off');
    } else {
      this._setType('password');
      this._setIcon('visibility');
    }
  }

});

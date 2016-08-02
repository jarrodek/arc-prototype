Polymer({
  is: 'paper-masked-input',

  properties: {
    // Label to display
    label: String,

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
      value: 'arc:visibility',
      readOnly: true
    },

    // Input field type
    type: {
      type: String,
      value: 'password',
      readOnly: true
    },

    // Icon's alt label
    alt: {
      type: String,
      computed: '_computeAlt(title)'
    },

    // Icon's title label
    title: {
      type: String,
      value: 'Show password',
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
      this._setIcon('arc:visibility-off');
      this._setTitle('Hide password');
    } else {
      this._setType('password');
      this._setIcon('arc:visibility');
      this._setTitle('Show password');
    }
  },

  _computeAlt: function(title) {
    return title + ' icon';
  },

  clear: function() {
    this.set('value', '');
  }

});

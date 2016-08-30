Polymer({
  is: 'api-listing-panel',

  // behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    activated: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },
    opened: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
      notify: true
    },
    noCancelOnOutsideClick: {
      type: Boolean,
      value: true
    },

    selectedTab: {
      type: Number,
      value: 0
    }
  },

  observers: [
    '_openedChanged(opened)'
  ],

  open: function() {
    this.opened = true;
  },

  close: function() {
    this.activated = false;
    this.async(() => {
      this.opened = false;
    }, 500);
  },

  _openedChanged: function(opened) {
    this.async(() => {
      this.activated = opened;
    }, 1);
  }
});

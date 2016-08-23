Polymer({
  is: 'http-source-message-view',

  properties: {
    message: String
  },

  toggle: function() {
    this.$.collapse.toggle();
  },

  _computeIcon: function(opened) {
    return opened ? 'arc:expand-less' : 'arc:expand-more';
  }
});

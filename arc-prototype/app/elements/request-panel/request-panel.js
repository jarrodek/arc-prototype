Polymer({
  is: 'request-panel',

  properties: {
    contentType: {
      type: Object,
      notify: true
    },
    isPayload: {
      type: Boolean,
      notify: true
    }
  },

  run: function() {
    this.fire('run-request');
  }
});

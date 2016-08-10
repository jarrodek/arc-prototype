Polymer({
  is: 'request-config-panel',

  properties: {
    selectedPage: {
      type: Number,
      value: 0
    },

    contentType: {
      type: Object,
      notify: true
    },

    isPayload: Boolean
  }
});

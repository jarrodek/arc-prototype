Polymer({
  is: 'request-config-panel',

  properties: {
    headers: {
      type: String,
      notify: true
    },
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

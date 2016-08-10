Polymer({
  is: 'request-payload-panel',

  properties: {
    selectedPage: {
      type: Number,
      value: 0
    },

    contentType: {
      type: Object,
      notify: true
    }
  }
});

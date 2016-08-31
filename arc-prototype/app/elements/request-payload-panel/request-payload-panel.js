Polymer({
  is: 'request-payload-panel',

  properties: {
    jsonPayload: Object,
    body: String,
    selectedPage: {
      type: Number,
      value: 0
    },

    contentType: {
      type: Object,
      notify: true
    }
  },

  observers: [
    '_bodyChanged(body)'
  ],

  _bodyChanged: function(body) {
    try {
      let json = JSON.parse(body);
      this.jsonPayload = json;
    } catch (e) {

    }
  }
});

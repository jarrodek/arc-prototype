Polymer({
  is: 'raml-request-panel',

  properties: {
    data: Object,
    selectedApiPath: String,
    selectedApiMethod: Object,
    request: {
      type: Object,
      notify: true
    },
    url: String,
    bodies: Array,
    contentType: {
      type: Object,
      notify: true
    }
  },

  observers: [
    '_bodiesChanged(bodies.*)'
  ],

  _apiMethodChanged: function(e) {
    var m = e.detail.method;
    this.selectedApiMethod = m;
    this.selectedApiPath = e.detail.path;
    this.request.method = m.method;
  },

  _bodiesChanged: function() {
    var b = this.bodies;
    if (!b || !b.length) {
      return;
    }
    // Use first content type
    this.contentType = b[0].contentType;
  }
});

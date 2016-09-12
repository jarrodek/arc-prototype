Polymer({
  is: 'raml-examples-panel',

  properties: {
    baseUrl: String,
    method: Object,
    parentEndpoint: Object,
    methodUrl: String,
    selectedExample: {
      type: Number,
      value: 0
    }
  },

  observers: [
    '_computeUrl(baseUrl, method.*, parentEndpoint.*)'
  ],

  _computeUrl: function(baseUrl) {
    if (typeof this.parentEndpoint === 'string') {
      this.parentEndpoint = JSON.parse(this.parentEndpoint);
      return;
    }
    var url = baseUrl;
    if (url[url.lenght - 1] === '/') {
      url = url.substr(0, url.lenght - 1);
    }

    var path = this.parentEndpoint.fullUrl;
    if (path[0] !== '/') {
      path = '/' + path;
    }
    this.methodUrl = url + path;
  }
});

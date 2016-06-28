Polymer({
  is: 'raml-endpoint-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    // Specifies the API security mechanisms.
    url: String,
    // An alternate, human-friendly name for the security scheme.
    displayName: String,
    // Optional description
    description: String,
    // A query parameters attached to the endpoint.
    queryParams: Array,
    // Parent endpoint. Undefined if parent is root element.
    endpoint: Object
  },

  appendQueryParameter: function() {
    this.$.queryParamsEditor.addParam();
  },

  _canDisplayParamsTable: function(paramsLength) {
    return !!paramsLength;
  },
  // Callend on edit cancel
  cancel: function() {
    this.opened = false;
  },

  save: function() {
    var fullUrl = '/';
    var path = [];
    if (this.endpoint) {
      fullUrl = this.endpoint.fullUrl;
      if (fullUrl[fullUrl.length - 1] !== '/') {
        fullUrl += '/';
      }
      path = this.endpoint.path;
      path.push(this.endpoint.displayName || this.endpoint.url);
    }
    fullUrl += this.url;
    this.fire('save', {
      url: this.url,
      fullUrl: this.url,
      path: path,
      displayName: this.displayName,
      description: this.description,
      queryParams: this.queryParams
    });
  },

  _computeUrlPrefix: function(fullUrl) {
    if (!fullUrl) {
      return '/';
    }
    if (fullUrl[0] !== '/') {
      fullUrl = '/' + fullUrl;
    }
    return fullUrl;
  }

});

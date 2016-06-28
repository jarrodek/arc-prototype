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
    endpoint: {
      type: Object,
      value: function() {
        return {};
      }
    }
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
      // path.push(this.displayName || this.endpoint.url);
    }
    fullUrl += this.url;
    if (fullUrl[0] !== '/') {
      fullUrl = '/' + fullUrl;
    }
    path.push(this.displayName || this.url);
    this.fire('save', {
      url: this.url,
      fullUrl: fullUrl,
      path: path,
      displayName: this.displayName,
      description: this.description,
      queryParams: this.queryParams
    });
  },

  _computeUrlPrefix: function() {
    var fullUrl = this.endpoint ? this.endpoint.fullUrl : null;
    // console.log('_computeUrlPrefix', fullUrl);
    if (!fullUrl) {
      return '/';
    }
    if (fullUrl[0] !== '/') {
      fullUrl = '/' + fullUrl;
    }
    return fullUrl;
  }

});

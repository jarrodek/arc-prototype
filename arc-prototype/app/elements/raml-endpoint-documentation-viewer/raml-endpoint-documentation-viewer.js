Polymer({
  is: 'raml-endpoint-documentation-viewer',

  properties: {
    endpoint: Object
  },

  _computeEndpointName: function() {
    return this.endpoint.displayName || this.endpoint.fullUrl;
  },

  _computeHideDesc(description) {
    return !description;
  },

  _computeMethodName: function(item) {
    return item.displayName || item.method;
  }
});

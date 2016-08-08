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
  },

  _openMethodDoc: function(e) {
    var index = this.$.methodsRepeater.indexForElement(e.target);
    var path = '' + index;
    this.fire('method-selected', {
      path: path,
      method: this.endpoint.methods[index]
    });
  }
});

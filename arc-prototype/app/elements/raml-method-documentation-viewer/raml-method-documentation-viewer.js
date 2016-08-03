Polymer({
  is: 'raml-method-documentation-viewer',

  properties: {
    method: Object,
    parentEndpoint: Object,
    parentEndpointName: String,
    hasParentEndpointName: String
  },

  observers: [
    '_parentEndpointChanged(parentEndpoint.*)'
  ],

  _parentEndpointChanged: function() {
    var e = this.parentEndpoint;
    if (!e) {
      this.parentEndpointName = undefined;
      this.hasParentEndpointName = false;
      return;
    }

    this.parentEndpointName = e.displayName || e.url;
    this.hasParentEndpointName = true;
  },

  _computeMethodName: function() {
    var m = this.method;
    return m.displayName || m.method;
  },

  _computeHideMethodDesc(description) {
    return !description;
  }
});

Polymer({
  is: 'raml-endpont-path',

  properties: {
    parentEndpoint: Object,
    // True if this is child path.
    parent: {
      type: Boolean,
      value: false,
      readOnly: true
    }
  },

  observers: [
    '_parentEndpointChanged(parentEndpoint.*)'
  ],

  _parentEndpointChanged: function() {
    if (!this.parentEndpoint) {
      this._setParent(false);
    } else {
      this._setParent(true);
    }
  }
});

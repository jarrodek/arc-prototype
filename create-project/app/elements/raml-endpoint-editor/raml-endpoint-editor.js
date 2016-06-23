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
    queryParams: Array
  },

  appendQueryParameter: function() {
    this.$.queryParamsEditor.addParam();
  },

  _canDisplayParamsTable: function(paramsLength) {
    return !!paramsLength;
  },

});

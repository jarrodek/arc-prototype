Polymer({
  is: 'raml-endpoint-method-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    // An endpoint to which the method will be added to.
    endpoint: Object,
    // A HTTP method.
    method: String,
    // A list of query parameters in the describedBy node.
    queryParams: {
      type: Array,
      value: function() {
        return [];
      }
    },
    // A list of headers in describedBy node.
    headers: {
      type: Array,
      value: function() {
        return [];
      }
    },
  },

  _computeEndpointName: function(endpoint) {
    return endpoint.displayName || endpoint.url;
  },

  // Tru if the table can be displayed for given numeric value (true for positive value)
  _canDisplayTableLength: function(numericValue) {
    return !!numericValue;
  },

  appendHeader: function() {
    this.$.headersEditor.addHeader();
  },

  appendQueryParameter: function() {
    this.$.queryParamsEditor.addParam();
  },

  // Callend on edit cancel
  cancel: function() {
    this.opened = false;
  },

  save: function() {
    this.fire('save', {
      endpoint: this.endpoint,
      method: this.method,
      queryParams: this.queryParams,
      headers: this.headers
    });
    this.opened = false;
  }
});

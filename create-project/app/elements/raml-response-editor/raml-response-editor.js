Polymer({
  is: 'raml-response-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    // name of the trait
    statusCode: Number,
    // Selected content type
    contentType: String,
    // Trait desc.
    description: String,

    // List of response headers
    headers: {
      type: Array,
      value: function() {
        return [];
      }
    },

    descInput: {
      type: HTMLElement,
      value: function() {
        return this.$.descInput;
      }
    }
  },

  appendHeader: function() {
    this.$.headersEditor.addHeader();
  },

  _canDisplayTable: function(numeric) {
    return numeric > 0;
  },

  cancel: function() {
    this.opened = false;
  },

  save: function() {
    this.fire('save-response', {
      statusCode: this.statusCode,
      contentType: this.contentType,
      headers: this.headers
    });
    this.opened = false;
  }
});

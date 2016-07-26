Polymer({
  is: 'raml-response-editor',

  behaviors: [Polymer.IronOverlayBehavior, window.RamlBehaviors.RamlTypeBehavior],

  properties: {
    // name of the trait
    statusCode: Number,
    // Selected content type
    contentType: String,
    // Trait desc.
    description: String,
    // Currently selected type in the dropdown.
    selectedType: String,
    // true if the item is array
    typeArray: Boolean,

    bodySelectorPage: {
      type: Number,
      value: 0
    },

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
    },

    type: {
      type: Object,
      value: function() {
        return {
          'baseType': 'object'
        };
      }
    }
  },

  reset: function() {
    this.type = {
      baseType: 'object'
    };
    this.headers = [];
    this.bodySelectorPage = 0;
    this.typeArray = false;
    this.selectedType = '';
    this.description = '';
    this.contentType = '';
    this.statusCode = null;
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
    var body = null;
    if (this.selectedType) {
      body = this.selectedType;
    } else if (this.type.typeProperties) {
      body = this.type;
    }
    var detail = {
      statusCode: this.statusCode,
      contentType: this.contentType,
      headers: this.headers,
      description: this.description
    };
    if (body) {
      detail.body = body;
    }
    this.fire('save-response', detail);
    this.opened = false;
  }
});

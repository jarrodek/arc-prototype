Polymer({
  is: 'raml-trait-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    // name of the trait
    traitName: String,
    // List of headers
    headers: {
      type: Array,
      value: function() {
        return [];
      }
    },

    // List of query parameters
    queryParams: {
      type: Array,
      value: function() {
        return [];
      }
    },

    // List of query parameters
    responses: {
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

    usageInput: {
      type: HTMLElement,
      value: function() {
        return this.$.usageInput;
      }
    }
  },

  appendHeader: function() {
    this.$.headersEditor.addHeader();
  },

  appendQueryParameter: function() {
    this.$.queryParamsEditor.addParam();
  },

  _canDisplayTable: function(numeric) {
    return numeric > 0;
  },

  appendResponse: function() {
    this.$.responseEditor.open();
  },

  onResponseSaved: function(e) {
    var response = e.detail;
    this.push('responses', response);
  }
});

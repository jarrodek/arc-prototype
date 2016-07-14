Polymer({
  is: 'raml-trait-editor',

  behaviors: [Polymer.IronOverlayBehavior, window.RamlBehaviors.RamlTypeBehavior],

  properties: {
    // name of the trait
    traitName: String,
    description: String,
    usage: String,
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

    // List of responses
    responses: {
      type: Array,
      value: function() {
        return [];
      }
    },

    // List of requests
    requests: {
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
    },

    onboarding: {
      type: Boolean,
      value: true
    }
  },

  observers: [
    '_valueChanged(headers.*)',
    '_valueChanged(queryParams.*)',
    '_valueChanged(responses.*)'
  ],

  reset: function() {
    this.traitName = '';
    this.description = '';
    this.usage = '';
    this.headers = [];
    this.queryParams = [];
    this.responses =  [];
    this.requests = [];
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
    this.$.responseTable.add();
  },

  _valueChanged: function() {
    var hasValues =  !!this.headers ||
      !!this.queryParams ||
      !!this.responses;
    if (hasValues && this.onboarding) {
      this.onboarding = false;
    } else if (!hasValues && !this.onboarding) {
      this.onboarding = true;
    }
  },

  save: function() {
    var detail = {
      name: this.traitName,
      description: this.description,
      usage: this.usage,
      headers: this.headers,
      queryParams: this.queryParams,
      responses: this.responses,
      requests: this.requests
    };
    this.fire('trait-saved', detail);
  },

  cancel: function() {
    this.opened = false;
  }
});

Polymer({
  is: 'raml-endpoints-editor',

  properties: {
    // List of endpoints
    endpoints: {
      type: Array,
      value: function() {
        return [];
      }
    },
    // True if (some) endpoints has been defineds.
    hasEndpoints: {
      type: Boolean,
      readOnly: true,
      notify: true
    },

    // Currently selected endpoint.
    selectedEndpoint: Object
  },

  observers: [
    '_endpointsChanged(endpoints.*)'
  ],

  listeners: {
    'tap': '_workspaceTap'
  },

  _endpointsChanged: function() {
    var s = this.endpoints;
    this._setHasEndpoints(s && s.length);
  },

  addEndpoint: function() {
    this.$.endpointEditor.endpoint = this.selectedEndpoint;
    this.$.endpointEditor.open();
  },

  _onEndpointSave: function(e) {
    this.push('endpoints', e.detail);
    this.$.endpointEditor.close();
    this.$.methodEditor.endpoint = e.detail;
    this.$.methodEditor.open();
  },

  _onEndpointMethodSave: function(e) {
    var d = e.detail;
    var enps = this.endpoints;
    var endpoint = null;
    var index = 0;
    for (var i = 0, len = enps.length; i < len; i++) {
      if (enps[i] === d.endpoint) {
        endpoint = enps[i];
        index = i;
        break;
      }
    }
    if (!endpoint) {
      endpoint = {
        methods: []
      };
    } else if (!endpoint.methods || !endpoint.methods.length) {
      endpoint.methods = [];
    }
    var arr = endpoint.methods;
    delete d.endpoint;
    arr.push(d);

    this.set('endpoints.' + index + '.methods', arr);
  },

  addMethod: function() {
    if (!this.selectedEndpoint) {
      this.$.noEndpoint.open();
      return;
    }
    this.$.methodEditor.endpoint = this.selectedEndpoint;
    this.$.methodEditor.open();
  },

  _workspaceTap: function(e) {
    e = Polymer.dom(e);
    if (e.path[0] !== this) {
      return;
    }
    this.selectedEndpoint = undefined;
  }
});

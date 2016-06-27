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
    }
  },

  observers: [
    '_endpointsChanged(endpoints.*)'
  ],

  _endpointsChanged: function() {
    var s = this.endpoints;
    this._setHasEndpoints(s && s.length);
  },

  addEndpoint: function() {
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
  }
});

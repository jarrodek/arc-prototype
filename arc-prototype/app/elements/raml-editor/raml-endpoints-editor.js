Polymer({
  is: 'raml-endpoints-editor',

  properties: {
    // List of endpoints
    endpoints: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
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
    if (!this.selectedEndpoint) {
      this.push('endpoints', e.detail);
    } else {
      let all = this.endpoints;
      for (let i = 0, len = all.length; i < len; i++) {
        if (this.selectedEndpoint === all[i]) {
          if (!all[i].endpoints) {
            this.set('endpoints.' + i + '.endpoints', [e.detail]);
          } else {
            this.push('endpoints.' + i + '.endpoints', e.detail);
          }
        }
      }
    }

    this.$.endpointEditor.close();
    this.$.methodEditor.endpoint = e.detail;
    this.$.methodEditor.open();
  },

  _onEndpointMethodSave: function(e) {
    var enps = this.endpoints;
    var d = e.detail;
    var ref = d.endpoint;
    delete d.endpoint;
    for (let i = 0, len = enps.length; i < len; i++) {
      let path = 'endpoints.' + i;
      let res = this._setMethodRecursive(d, ref, enps[i], path);
      if (res) {
        return true;
      }
    }
    console.error('Unable to find a suitable endpoint.', e.detail);
  },

  _setMethodRecursive: function(method, ref, endpoint, path) {
    if (ref === endpoint) {
      if (!endpoint.methods) {
        this.set(path + '.methods', [method]);
      } else {
        this.push(path + '.methods', method);
      }
      return true;
    } else {
      if (!endpoint.endpoints || !endpoint.endpoints.length) {
        return false;
      }
      for (let i = 0, len = endpoint.endpoints.length; i < len; i++) {
        let rPath = path + '.endpoints.' + i;
        let res = this._setMethodRecursive(method, ref, endpoint.endpoints[i], rPath);
        if (res) {
          return true;
        }
      }
      return false;
    }
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

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
  }
});

Polymer({
  is: 'raml-methods-viewer',

  properties: {

    methods: {
      type: Array,
      value: function() {
        return [];
      }
    }

  },

  _computeMethodDisplayName: function(method) {
    return method.displayName || method.method;
  },

  _openMethod: function() {
    this.fire('navigate', {
      'section': 'raml',
      'action': 'run'
    });
  }
});

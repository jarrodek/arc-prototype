Polymer({
  is: 'raml-type-properties-editor',

  properties: {
    // List of type's properties
    typeProperties: {
      type: Array,
      value: function() {
        return [];
      }
    }
  },

  add: function() {
    this.push('typeProperties', {
      'type': 'string'
    });
  }
});

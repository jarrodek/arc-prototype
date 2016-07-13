
Polymer({
  is: 'raml-type-property-object',

  properties: {
    // The maximum number of properties allowed for instances of this type.
    maxProperties: {
      type: Number,
      notify: true
    },
    // The minimum number of properties allowed for instances of this type.
    minProperties: {
      type: Number,
      notify: true
    },
    // The properties that instances of this type can or must have.
    typeProperties: {
      type: Array,
      notify: true,
      value: function() {
        return [];
      }
    },
    // A Boolean that indicates if an object instance has additional properties.
    additionalProperties: {
      type: Boolean,
      notify: true,
      value: true
    }
  }

});

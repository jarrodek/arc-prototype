
Polymer({
  is: 'raml-type-property-number',

  properties: {
    // The minimum value of the parameter.
    minimum: {
      type: Number,
      notify: true
    },
    // The maximum value of the parameter.
    maximum: {
      type: Number,
      notify: true
    },
    /**
     * A numeric instance is valid against "multipleOf" if the result of dividing the instance by
     * this keyword's value is an integer.
     */
    multipleOf: {
      type: Number,
      notify: true
    },
    /**
     * The format of the value. The value MUST be one of the following: int32, int64, int, long,
     * float, double, int16, int8
     */
    format: {
      type: String,
      notify: true
    },
    // An example of the property.
    example: {
      type: String,
      notify: true
    },

    // Available number formats for this property.
    availableFormats: {
      type: Array,
      value: function() {
        return [
          {value: 'int', name: 'Integer'},
          {value: 'long', name: 'Long'},
          {value: 'float', name: 'Float'},
          {value: 'double', name: 'Double'},
          {value: 'int64', name: 'Integer (64 bit)'},
          {value: 'int32', name: 'Integer (32 bit)'},
          {value: 'int16', name: 'Integer (16 bit)'},
          {value: 'int8', name: 'Integer (8 bit)'}
        ];
      }
    }
  }

});

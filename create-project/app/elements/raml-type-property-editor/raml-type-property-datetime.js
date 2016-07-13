
Polymer({
  is: 'raml-type-property-datetime',

  properties: {
    // The type of the property.
    dateType: {
      type: Number,
      notify: true
    },
    /**
     * The format of the value. The value MUST be one of the following: int32, int64, int, long,
     * float, double, int16, int8
     */
    format: {
      type: String,
      notify: true,
      value: 'rfc3339'
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
          {value: 'rfc3339', name: 'RFC-3339'},
          {value: 'rfc2616', name: 'RFC-2616'}
        ];
      }
    },

    // Available date type
    availableTypes: {
      type: Array,
      value: function() {
        return [
          {value: 'date-only', name: 'Date only'},
          {value: 'time-only', name: 'Time only'},
          {value: 'datetime-only', name: 'Date and time only'},
          {value: 'datetime', name: 'Date object'}
        ];
      },
      readOnly: true
    },

    // True shows format field
    showFormat: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_dateTypeChanged(dateType)'
  ],

  _dateTypeChanged: function(dateType) {
    if (dateType === 'datetime') {
      this.showFormat = true;
    } else {
      this.showFormat = false;
    }
  }

});

Polymer({
  is: 'raml-type-property-editor',

  properties: {
    property: Object,

    isAny: {
      type: Boolean,
      value: false
    },

    isObject: {
      type: Boolean,
      value: false
    },

    isArray: {
      type: Boolean,
      value: false
    },

    isUnion: {
      type: Boolean,
      value: false
    },

    isNumber: {
      type: Boolean,
      value: false
    },

    isBoolean: {
      type: Boolean,
      value: false
    },

    isString: {
      type: Boolean,
      value: false
    },

    isDateOnly: {
      type: Boolean,
      value: false
    },

    isTimeOnly: {
      type: Boolean,
      value: false
    },

    isDateTimeOnly: {
      type: Boolean,
      value: false
    },

    isDateTime: {
      type: Boolean,
      value: false
    },

    isFile: {
      type: Boolean,
      value: false
    },

    isInteger: {
      type: Boolean,
      value: false
    },

    isNull: {
      type: Boolean,
      value: false
    },
    // Is user defined Type.
    isDeclared: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_typeChanged(property.type)'
  ],

  _typeChanged: function(type) {
    this.isAny = false;
    this.isObject = false;
    this.isArray = false;
    this.isUnion = false;
    this.isNumber = false;
    this.isBoolean = false;
    this.isString = false;
    this.isDateOnly = false;
    this.isTimeOnly = false;
    this.isDateTimeOnly = false;
    this.isDateTime = false;
    this.isFile = false;
    this.isInteger = false;
    this.isNull = false;
    switch (type) {
      case 'any': this.isAny = true; break;
      case 'object': this.isObject = true; break;
      case 'array': this.isArray = true; break;
      case 'union': this.isUnion = true; break;
      case 'number': this.isNumber = true; break;
      case 'boolean': this.isBoolean = true; break;
      case 'string': this.isString = true; break;
      case 'date-only': this.isDateOnly = true; break;
      case 'time-only': this.isTimeOnly = true; break;
      case 'datetime-only': this.isDateTimeOnly = true; break;
      case 'datetime': this.isDateTime = true; break;
      case 'file': this.isFile = true; break;
      case 'integer': this.isInteger = true; break;
      case 'null': this.isNull = true; break;
    }
  }

});

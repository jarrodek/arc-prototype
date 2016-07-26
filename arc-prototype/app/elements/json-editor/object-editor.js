Polymer({
  is: 'object-editor',

  properties: {
    // If true this element should not show a key field.
    noKey: {
      type: Boolean
    },

    value: {
      type: Object,
      value: function() {
        return [];
      },
      notify: true
    },

    isObject: Boolean,
    isArray: Boolean,
    isString: Boolean,
    isNumber: Boolean,
    isBoolean: Boolean,
    isNull: Boolean
  },

  observers: [
    '_valueChanged(value.*)'
  ],

  _valueChanged: function() {
    var v = this.value;
    this.isObject = false;
    this.isArray = false;
    this.isString = false;
    this.isNumber = false;
    this.isBoolean = false;
    this.isNull = false;
    if (!v.type) {
      return;
    }

    switch (v.type) {
      case 'object': this.isObject = true; break;
      case 'array': this.isArray = true; break;
      case 'string': this.isString = true; break;
      case 'number': this.isNumber = true; break;
      case 'boolean': this.isBoolean = true; break;
      case 'null': this.isNull = true; break;
    }
  }
});

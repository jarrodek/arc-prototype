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
        return {};
      },
      notify: true
    },

    childrenObjects: {
      type: Array,
      value: [],
      notify: true
    },

    isObject: Boolean,
    isArray: Boolean,
    isString: Boolean,
    isInteger: Boolean,
    isFloat: Boolean,
    isBoolean: Boolean,
    isNull: Boolean,

    booleanValues: {
      type: Array,
      value: function() {
        return [
          {
            display: 'True',
            value: true
          },
          {
            display: 'False',
            value: false
          }
        ];
      },
      readOnly: true
    }
  },

  observers: [
    '_valueChanged(value.*)',
    '_countChildren(value.children.length)',
    '_countChildren(value.value.children.length)'
  ],

  _valueChanged: function() {
    // console.log('Value changed');
    var v = this.value;
    this.isObject = false;
    this.isArray = false;
    this.isString = false;
    this.isInteger = false;
    this.isFloat = false;
    this.isBoolean = false;
    this.isNull = false;
    var type = v.type || v.value.type;
    if (!type) {
      return;
    }

    switch (type) {
      case 'object': this.isObject = true; break;
      case 'array': this.isArray = true; break;
      case 'string': this.isString = true; break;
      case 'float': this.isFloat = true; break;
      case 'integer': this.isInteger = true; break;
      case 'boolean': this.isBoolean = true; break;
      case 'null': this.isNull = true; break;
    }
  },

  _countChildren: function() {
    // console.log('Children count changed');
    var v = this.value;
    this.set('childrenObjects', v.children || v.value.children);
  },

  _remove: function() {
    this.fire('remove-value', {
      value: this.value
    });
  },

  _deepRemove: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();
    var rm = e.detail.value;
    /// this.value.value.children[0] === e.detail.value
    var children = this.value.value.children;
    for (let i = 0, len = children.length; i < len; i++) {
      if (children[i] === rm) {
        this.splice('value.value.children', i, 1);
        break;
      }
    }
    // console.log('Remove deeply', e);
  },

  _insertObject: function() {
    console.log('_insertObject', this.value);
  }
});

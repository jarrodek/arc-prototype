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
    },
    typesValues: {
      type: Array,
      value: function() {
        return [{
            display: 'String',
            value: 'string'
          },{
            display: 'Float',
            value: 'float'
          },{
            display: 'Integer',
            value: 'integer'
          },{
            display: 'Boolean',
            value: 'boolean'
          },{
            display: 'Null',
            value: 'null'
          },{
            display: 'Object',
            value: 'object'
          },{
            display: 'Array',
            value: 'array'
          }];
      },
      readOnly: true
    },

    changingType: {
      type: Boolean,
      value: false
    },

    keyInput: {
      type: HTMLElement,
      value: function() {
        return this.$.keyInput;
      }
    },
    keySuggestionsList: {
      type: Array,
      // value: function() {
      //   return [
      //     'id',
      //     'kind',
      //     'name',
      //     'age',
      //     'phone-number',
      //     'address'
      //   ];
      // }
    },

    schema: Object,
    // The description of the value of the field.
    description: String
  },

  observers: [
    '_valueChanged(value.*)',
    '_countChildren(value.children.length)',
    '_countChildren(value.value.children.length)',
    '_schemaChanged(schema.*)'
  ],

  _valueChanged: function() {
    var v = this.value;
    // console.log('Value changed', v);
    this.isObject = false;
    this.isArray = false;
    this.isString = false;
    this.isInteger = false;
    this.isFloat = false;
    this.isBoolean = false;
    this.isNull = false;
    var type = v.type || v.value.type;
    if (!type) {
      this.changingType = true;
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
    // debugger;
    var rm = e.detail.value;
    /// this.value.value.children[0] === e.detail.value
    var children = this.value.children || this.value.value.children;
    for (let i = 0, len = children.length; i < len; i++) {
      if (children[i] === rm) {
        if ('value' in this.value) {
          this.splice('value.value.children', i, 1);
        } else {
          this.splice('value.children', i, 1);
        }
        Polymer.dom(this.root).querySelector('[object-repeater]').render();
        break;
      }
    }
    // console.log('Remove deeply', e);
  },

  _insertObject: function() {
    // console.log('_insertObject', this.value);
    var obj = {
      'name': '',
      'value': {
        value: ''
      }
    };
    if ('value' in this.value) {
      if (!this.value.value.children || !this.value.value.children.length) {
        this.value.value.children = [];
      }
      this.push('value.value.children', obj);
    } else {
      if (!this.value.children || !this.value.children.length) {
        this.value.children = [];
      }
      this.push('value.children', obj);
    }
    Polymer.dom(this.root).querySelector('[object-repeater]').render();
  },

  _computeKeyLineClass: function(isObject, changingType) {
    var clazz = 'key-line';
    if (isObject && !changingType) {
      clazz += ' objectable';
    }
    return clazz;
  },

  _valueMenuItemSelected: function(e) {
    // console.log('_valueMenuItemSelected', e, Polymer.dom(e));
    switch (e.detail.item.dataset.action) {
      case 'type-change':
        this.changingType = true;
      break;
      case 'delete':
        this._remove(e);
      break;
      case 'insert-variable':
        this.$.noFeat.open();
      break;
    }
    var target = Polymer.dom(e).rootTarget;
    target.selected = -1;
  },

  _cancelTypeChange: function() {
    this.changingType = false;
  },

  _typeSelected: function(e) {
    if (!this.changingType) {
      return;
    }
    this.changingType = false;
    var type = e.detail.item.dataset.type;
    this.set('value.type', type);
  },

  _render: function() {
    var elm = Polymer.dom(this.root).querySelector('[object-repeater]');
    if (elm) {
      elm.render();
    }
  },

  _schemaChanged: function() {
    var s = this.schema;
    if (!s || !s.properties) {
      this.keySuggestionsList = [];
      return;
    }
    var suggestions = Object.getOwnPropertyNames(s.properties);
    if (!suggestions.length) {
      return;
    }
    // console.log('setting keySuggestionsList', suggestions);
    this.set('keySuggestionsList', suggestions);
  },

  _onSuggestion: function(e) {
    var key = e.detail.value;
    var p = this.schema.properties;
    if (!(key in p)) {
      return;
    }
    var prop = p[key];
    var type = prop.type;
    if (type) {
      this.set('value.value.type', type);
    }
    if (prop.description) {
      this.description = prop.description;
    } else {
      this.description = undefined;
    }
    console.log('_onSuggestion', p[key]);
  }
});

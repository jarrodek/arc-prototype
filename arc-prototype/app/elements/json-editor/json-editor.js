(function() {
'use strict';
Polymer({
  is: 'json-editor',

  properties: {
    // A JavaScript object to edit
    json: {
      type: Object,
      value: function() {
        return {};
      },
      notify: true
    },

    model: Object,

    noKey: {
      type: Boolean,
      value: false
    },

    schema: Object
  },

  observers: [
    '_jsonChanged(json)'
  ],

  _jsonChanged: function(json) {
    var model = this._translate(json);
    // console.log('_jsonChanged::model', model);
    this.model = model;
  },

  // Translate JSON object to a editor's object model.
  _translate: function(obj) {
    var result = {
      type: 'object'
    };
    // type can be either: object, array, string, number, boolean, null
    if (obj instanceof Array) {
      result.type = 'array';
      result.children = [];
      obj.forEach((item) => {
        result.children.push(this._translate(item));
      });
    } else if (typeof obj === 'string') {
      result.type = 'string';
      result.value = obj;
    } else if (typeof obj === 'number') {
      result.type = Number.isInteger(obj) ? 'integer' : 'float';
      result.value = obj;
    } else if (typeof obj === 'boolean') {
      result.type = 'boolean';
      result.value = obj;
    } else if (obj === null || obj === undefined) {
      result.type = 'null';
      result.value = null;
    } else {
      result.children = [];
      let keys = Object.getOwnPropertyNames(obj);
      keys.forEach((key) => {
        let item = {
          'name': key,
          'value': this._translate(obj[key])
        };
        item.type = item.value.type;
        result.children.push(item);
      });
    }
    return result;
  },

  _isObject: function(type) {
    return type === 'object';
  },

  _isArray: function(type) {
    return type === 'array';
  }
});
})();

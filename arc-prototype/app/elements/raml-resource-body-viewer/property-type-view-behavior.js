(function() {
'use strict';

window.RamlBehaviors = window.RamlBehaviors || {};
window.RamlBehaviors.PropertyTypeViewBehavior = {

  properties: {
    body: Object,
    dataDisplay: String,
    baseTypes: {
      type: Array,
      value: function() {
        return ['object', 'array','integer', 'string','number','boolean','datetime','file',
          'null','any'];
      }
    }
  },

  observers: [
    '_createJson(body.*)'
  ],

  _createJson: function() {
    var b = this.body;
    if (!b || !b.typeProperties) {
      this.jsonString = undefined;
      return;
    }
    var result = this._transformObject({}, b.typeProperties);
    this.dataDisplay = JSON.stringify(result, null, 2);
  },

  // Transform JSON object definition to the JSON representation.
  _transformObject: function(base, obj) {
    var bt = this.baseTypes;
    obj.forEach((item) => {
      if (bt.indexOf(item.type) === -1) {
        // other type defined in RAML
        base[item.name] = item.type;
      } else if (item.type === 'object') {
        base[item.name] = {};
        base[item.name] = this.__transformObject(base[item.name], item.typeProperties);
      } else {
        base[item.name] = item.example || item.type;
      }
    });
    return base;
  },
};
})();

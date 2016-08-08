Polymer({
  is: 'raml-resource-body-viewer',
  properties: {
    body: Object,

    displayName: String,
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
    '_computeBodyName(body.*)',
    '_createJson(body.*)',
    '_renderDisplayData(dataDisplay)'
  ],

  _computeBodyName: function() {
    var b = this.body;
    if (!b) {
      this.displayName = undefined;
      return;
    }
    this.displayName = b.displayName || b.typeId || b.baseType;
  },

  _createJson: function() {
    var b = this.body;
    if (!b || !b.typeProperties) {
      this.jsonString = undefined;
      return;
    }
    var result = this.__transformObject({}, b.typeProperties);
    this.dataDisplay = JSON.stringify(result, null, 2);
  },

  __transformObject: function(base, obj) {
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

  highlight: function(code, lang) {
    return this.fire('syntax-highlight', {code: this.dataDisplay, lang: lang}).detail.code;
  },

  _renderDisplayData: function(dataDisplay) {
    this.async(() => {
      this.$.output.innerHTML = this.highlight(dataDisplay, 'js');
    }, 1);
  },

  _hasValue: function(obj) {
    if (typeof obj === 'number' && obj === 0) {
      return true;
    }
    if (typeof obj === 'boolean') {
      return true;
    }
    return !!obj;
  },

  _hightlightElement: function(data, index, indexPrefix) {
    var code = this.fire('syntax-highlight', {code: data, lang: 'markdown'}).detail.code;

    this.async(() => {
      var attr = '';
      if (indexPrefix) {
        attr = indexPrefix;
      }
      attr += '' + index;
      var placement = Polymer.dom(this.root)
        .querySelector('.param-desc *[data-property-doc-markdown="' + attr + '"]');
      if (placement) {
        placement.innerHTML = code;
      }
    });
  },

  _hasSubproperties: function(item) {
    return !!item.typeProperties;
  }
});

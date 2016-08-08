Polymer({
  is: 'raml-resource-property-item',
  extends: 'tr',
  properties: {
    // Parent type property
    data: Object
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

  _hightlightElement: function(data, index) {
    var code = this.fire('syntax-highlight', {code: data, lang: 'markdown'}).detail.code;

    this.async(() => {
      var placement = Polymer.dom(this.root)
        .querySelector('.param-desc *[data-property-doc-markdown="' + index + '"]');
      if (placement) {
        placement.innerHTML = code;
      }
    });
  },

  _hasSubproperties: function(item) {
    return !!item.typeProperties;
  }
});

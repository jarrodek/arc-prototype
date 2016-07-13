Polymer({
  is: 'raml-type-properties-editor',

  properties: {
    // List of type's properties
    typeProperties: {
      type: Array,
      value: function() {
        return [];
      }
    }
  },

  add: function() {
    var p = this.typeProperties;
    if (!p || !p.length) {
      this.typeProperties = [];
    }
    this.push('typeProperties', {
      'type': 'string'
    });
  },

  _propertySaved: function(e) {
    var model = this.$.propertyRepeater.modelForElement(e.target);
    var data = e.detail.property;

    model.set('item', data);
    e.stopPropagation();
  },

  _propertyDeleted: function(e) {
    var item = this.$.propertyRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.typeProperties;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('typeProperties', index, 1);
  }
});

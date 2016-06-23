Polymer({
  is: 'raml-query-params-editor',

  properties: {
    params: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
    }
  },

  // appends empty header to the end of the list.
  addParam: function() {
    this.push('params', {
      'name': '',
      'example': '',
      'description': ''
    });
  },

  _onParamSave: function(e) {
    var model = this.$.paramsRepeater.modelForElement(e.target);
    var data = e.detail;
    model.set('item.name', data.name);
    model.set('item.description', data.description);
    model.set('item.type', data.type);
    model.set('item.example', data.example);
    model.set('item.pattern', data.pattern);
    model.set('item.required', data.required);
  },

  _onParamDelete: function(e) {
    var item = this.$.paramsRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.headers;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('params', index, 1);
  }
});

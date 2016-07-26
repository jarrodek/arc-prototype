Polymer({
  is: 'raml-headers-editor',

  properties: {
    headers: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
    }
  },

  // appends empty header to the end of the list.
  addHeader: function() {
    this.push('headers', {
      'name': '',
      'example': '',
      'description': ''
    });
  },

  _onHeaderSave: function(e) {
    var model = this.$.headersRepeater.modelForElement(e.target);
    var data = e.detail;
    model.set('item.name', data.name);
    model.set('item.description', data.description);
    model.set('item.type', data.type);
    model.set('item.example', data.example);
    model.set('item.pattern', data.pattern);
    model.set('item.required', data.required);
  },

  _onHeaderDelete: function(e) {
    var item = this.$.headersRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.headers;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('headers', index, 1);
  }
});

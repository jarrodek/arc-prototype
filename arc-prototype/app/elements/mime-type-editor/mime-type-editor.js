Polymer({
  is: 'mime-type-editor',

  properties: {
    // Defined mime types.
    types: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
    },

    mimeType: String
  },

  _remove: function(e) {
    var item = this.$.items.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.types;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('types', index, 1);
  },

  _add: function() {
    var v = this.mimeType;
    var t = this.types;
    if (!v) {
      this.$.noNameToast.open();
      return;
    }
    if (!(t && t.length)) {
      t = [];
      this.types = [];
    }
    this.mimeType = '';
    if (t.indexOf(v) !== -1) {
      // Quiletly quit.
      return;
    }
    this.push('types', v);
  }
});

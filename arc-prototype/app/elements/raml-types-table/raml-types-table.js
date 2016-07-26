Polymer({
  is: 'raml-types-table',

  properties: {
    type: Object
  },

  toggle: function() {
    this.$.collapse.toggle();
  },

  _typeName: function() {
    var t = this.type;
    if (t.displayName) {
      return t.displayName;
    }
    return t.typeId;
  },

  _typeDesc: function() {
    var t = this.type;
    if (!t || !t.description) {
      return 'No description provided';
    }
    return t.description;
  },

  _computeIcon: function(opened) {
    return opened ? 'arc:expand-less' : 'arc:expand-more';
  },

  edit: function() {
    this.fire('edit-type');
  },

  delete: function() {
    this.fire('delete-type');
  }
});

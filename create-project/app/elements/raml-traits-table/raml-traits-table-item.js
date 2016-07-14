Polymer({
  is: 'raml-traits-table-item',

  properties: {
    trait: Object,
    opened: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  toggle: function() {
    this.$.collapse.toggle();
  },

  _computeIcon: function(opened) {
    return opened ? 'arc:expand-less' : 'arc:expand-more';
  },

  edit: function() {
    this.fire('edit-trait');
  },

  delete: function() {
    this.fire('delete-trait');
  }
});

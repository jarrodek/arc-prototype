Polymer({
  is: 'raml-docs-table',

  properties: {
    name: String,
    documentation: String
  },

  toggle: function() {
    this.$.collapse.toggle();
  },

  _computeIcon: function(opened) {
    return opened ? 'arc:expand-less' : 'arc:expand-more';
  },

  edit: function() {
    this.fire('edit');
  },

  delete: function() {
    this.fire('delete');
  }
});

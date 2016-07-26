Polymer({
  is: 'raml-responses-table-item',
  properties: {
    response: Object
  },

  toggle: function() {
    this.$.collapse.toggle();
  },

  _computeIcon: function(opened) {
    return opened ? 'arc:expand-less' : 'arc:expand-more';
  },

  _computeItemType: function() {
    var b = this.response.body;
    if (typeof b === 'string') {
      return b;
    }
    return 'JSON schema';
  },

  edit: function() {
    this.fire('edit-response');
  },

  delete: function() {
    this.fire('delete-response');
  }
});

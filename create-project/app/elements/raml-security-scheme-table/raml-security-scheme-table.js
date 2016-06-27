Polymer({
  is: 'raml-security-scheme-table',

  properties: {
    scheme: Object
  },

  toggle: function() {
    this.$.collapse.toggle();
  },

  _schemeName: function() {
    var s = this.scheme;
    if (s.displayName) {
      return s.displayName;
    }
    var type = s.type;
    if (!type) {
      return 'unknown';
    }
    type = type.toLowerCase();
    type = type.replace(/[\s\.]/g, '_');
    return type;
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

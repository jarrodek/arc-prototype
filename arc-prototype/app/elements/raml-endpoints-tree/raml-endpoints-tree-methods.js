Polymer({
  is: 'raml-endpoints-tree-methods',

  properties: {
    methods: {
      type: Array,
      value: function() {
        return [];
      }
    }
  },

  // listeners: {
  //   'tap': '_fireSeelction'
  // },

  _computeMethodDisplayName: function(method) {
    return method.displayName || method.method;
  },

  _fireSeelction: function(e) {
    var index = this.$.repeater.indexForElement(e.target);
    var path = '' + index;
    this.fire('method-selected', {
      path: path,
      method: this.methods[index]
    });
  }

});

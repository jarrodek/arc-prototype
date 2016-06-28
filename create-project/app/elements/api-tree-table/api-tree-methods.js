Polymer({
  is: 'api-tree-methods',

  properties: {

    methods: {
      type: Array,
      value: function() {
        return [];
      }
    }

  },

  _computeMethodDisplayName: function(method) {
    return method.displayName || method.method;
  }
});

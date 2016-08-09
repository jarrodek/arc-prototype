Polymer({
  is: 'variables-editor',

  properties: {
    currentEnvironment: {
      type: String,
      value: 'default',
    },

    currentVariables: {
      type: Array,
      value: function() {
        return [{
          name: 'numericVariable',
          value: '1234',
          enabled: true
        },{
          name: 'absoluteNumericVariable',
          value: 'Math.abs(${numericVariable})',
          enabled: true
        }];
      }
    }
  },

  addEnvironment: function() {
    this.$.notYetToast.open();
  }
});

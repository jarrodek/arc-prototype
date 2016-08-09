Polymer({
  is: 'variable-item',

  properties: {
    name: {
      type: String,
      value: '',
      notify: true
    },
    value: {
      type: String,
      value: '',
      notify: true
    },
    enabled: {
      type: Boolean,
      value: true,
      notify: true
    }
  }
});

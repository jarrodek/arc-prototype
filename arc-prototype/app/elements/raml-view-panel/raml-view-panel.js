Polymer({
  is: 'raml-view-panel',
  properties: {
    // The RAML definition data
    data: {
      type: Object,
      value: function() {
        return {};
      },
      notify: true
    }
  }
});

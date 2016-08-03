Polymer({
  is: 'raml-detailed-view',

  properties: {
    // The RAML definition data
    data: {
      type: Object,
      value: function() {
        return {};
      },
      notify: true
    },
    
    selectedTab: {
      type: Number,
      value: 0
    }
  }
});

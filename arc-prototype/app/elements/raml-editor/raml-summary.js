Polymer({
  is: 'raml-summary',

  properties: {
    name: String,
    baseUrl: String,
    version: String,
    description: String,
    endpoints: Object,

    showVersion: {
      type: Boolean,
      value: false
    },

    selectedTab: {
      type: Number,
      value: 0
    }
  },

  observers: [
    '_computeVersion(version)'
  ],

  _computeVersion: function(version) {
    if (!!version) {
      this.showVersion = true;
    } else {
      this.showVersion = false;
    }
  }
});

Polymer({
  is: 'arc-create-project',

  properties: {
    wizardPage: {
      type: Number,
      value: 0
    },

    endpoints: Array,
    documentation: Array,
    securitySchemas: Array,
    name: String,
    description: String,
    baseUrl: String,
    version: String,
    mediaType: String
  },

  // Go to next tutorial page.
  nextPage: function() {
    this.wizardPage++;
  },

  previousPage: function() {
    this.wizardPage--;
  },

  _isCancelVisible: function(wizardPage) {
    return wizardPage !== 0;
  }
});

Polymer({
  is: 'arc-create-project',

  properties: {
    wizardPage: {
      type: Number,
      value: 0
    }
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

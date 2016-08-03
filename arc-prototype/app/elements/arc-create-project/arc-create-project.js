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
    types: Array,
    name: String,
    description: String,
    baseUrl: String,
    version: String,
    mediaType: String
  },

  observers: [
    '_valueChanged(name)',
    '_valueChanged(baseUrl)',
    '_valueChanged(endpoints.*)',
    '_valueChanged(documentation.*)',
    '_valueChanged(securitySchemas.*)',
    '_valueChanged(description)',
    '_valueChanged(version)'
  ],

  // Go to next tutorial page.
  nextPage: function() {
    if (this.wizardPage === 2) {
      this.$.savedInfo.open();
      return;
    }
    this.wizardPage++;
  },

  previousPage: function() {
    this.wizardPage--;
  },

  _isCancelVisible: function(wizardPage) {
    return wizardPage !== 0;
  },

  _valueChanged: function() {
    this.debounce('autosave', function() {
      let cl = this.$.saveStatus.classList;
      if (!cl.contains('visible')) {
        cl.add('visible');
        window.setTimeout(function() {
          this.hideSaveStatus();
        }.bind(this), 1500);
      }
    }, 1700);
  },

  hideSaveStatus: function() {
    var cl = this.$.saveStatus.classList;
    if (cl.contains('visible')) {
      cl.remove('visible');
    }
  },

  toJson: function() {
    return JSON.stringify({
      endpoints: this.endpoints,
      documentation: this. documentation,
      securitySchemas: this. securitySchemas,
      types: this. types,
      name: this. name,
      description: this. description,
      baseUrl: this. baseUrl,
      version: this. version,
      mediaType: this. mediaType
    });
  }
});

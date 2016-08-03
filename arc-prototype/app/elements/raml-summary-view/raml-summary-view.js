Polymer({
  is: 'raml-summary-view',

  properties: {
    name: String,
    baseUrl: String,
    version: String,
    description: String,
    showVersion: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_computeVersion(version)'
  ],

  isEmpty: function(obj) {
    if (!obj && typeof obj !== 'number') {
      return true;
    }
    if ((obj instanceof Array) && !obj.length) {
      return true;
    }
    if ((obj instanceof Object) && !Object.keys(obj).length) {
      return true;
    }
    return false;
  },

  _computeVersion: function(version) {
    if (!!version) {
      this.showVersion = true;
    } else {
      this.showVersion = false;
    }
  }
});

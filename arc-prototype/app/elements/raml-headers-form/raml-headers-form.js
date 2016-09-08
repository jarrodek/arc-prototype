Polymer({
  is: 'raml-headers-form',

  properties: {
    // A list of headers.
    headersList: Array,
    // Headers description defined in the RAML file.
    ramlHeaders: Array,
    // It's a copy of the `ramlHeaders` array that can be mnipulated by the user.
    renderedRamlHeaders: Array
  },

  observers: [
    '_ramlHeadersChanged(ramlHeaders.*)'
  ],

  _ramlHeadersChanged: function() {
    var h = this.ramlHeaders;
    if (!h || !h.length) {
      this.renderedRamlHeaders = [];
    } else {
      this.renderedRamlHeaders = h;
    }
  },

  _computeInputLabel: function(example) {
    if (!!example) {
      return `Example: ${example}`;
    }
    return 'Header value';
  }
});

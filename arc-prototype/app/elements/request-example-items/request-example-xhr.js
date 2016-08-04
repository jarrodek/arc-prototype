Polymer({
  is: 'request-example-xhr',

  properties: {
    method: Object,
    url: String
  },
  observers: [
    '_render(url, method.*)'
  ],
  _render: function() {
    var code = this.$.code.innerHTML;
    code = code.replace('<template is="dom-repeat"></template>', '');
    this.async(() => {
      this.$.output.innerHTML = this.highlight(code, 'js');
    }, 1);
  },
  highlight: function(code, lang) {
    return this.fire('syntax-highlight', {code: code, lang: lang}).detail.code;
  },

  _computeHeaderValue: function(headerObj) {
    if (headerObj.example) {
      return headerObj.example;
    }
    return headerObj.name + ' ' + headerObj.type;
  }
});

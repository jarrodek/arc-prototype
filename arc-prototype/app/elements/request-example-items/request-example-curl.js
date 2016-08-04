Polymer({
  is: 'request-example-curl',
  properties: {
    method: Object,
    url: String,
  },
  _computeHeaderValue: function(headerObj) {
    if (headerObj.example) {
      return headerObj.example;
    }
    return headerObj.name + ' ' + headerObj.type;
  }
});

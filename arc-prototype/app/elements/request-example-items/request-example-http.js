/* global URI */

Polymer({
  is: 'request-example-http',

  properties: {
    method: Object,
    url: String,

    path: String,
    hostValue: String
  },

  observers: [
    '_urlChanged(url)'
  ],

  _urlChanged: function(url) {
    if (!url) {
      this.path = '';
      return;
    }
    var uri = new URI(url);
    var host = uri.host();
    if (host.indexOf(':') === -1) {
      if (uri.protocol() === 'https') {
        host = ':443';
      }
    }
    this.hostValue = host;

    var query = uri.query();
    var path = uri.path();
    if (!path) {
      path = '/';
    }
    if (query) {
      path += '?' + query;
    }
    this.path = path;
  },

  _computeHeaderValue: function(headerObj) {
    if (headerObj.example) {
      return headerObj.example;
    }
    return headerObj.name + ' ' + headerObj.type;
  }

});

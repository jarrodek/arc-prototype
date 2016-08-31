Polymer({
  is: 'api-search-item',
  properties: {
    name: String,
    method: String,
    url: String,
    query: String,
    hideName: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_urlChanged(query, url)',
    '_methodChanged(method, url)',
    '_nameChanged(name, url)'
  ],

  _urlChanged: function(query, url) {
    var txt = this._mark(query, url);
    if (txt === null) {
      return;
    }
    this.$.url.innerHTML = txt;
  },

  _nameChanged: function(query, name) {
    var txt = this._mark(query, name);
    if (txt === null) {
      return;
    }
    this.$.name.innerHTML = txt;
  },

  _methodChanged: function(query, method) {
    var txt = this._mark(query, method);
    if (txt === null) {
      return;
    }
    this.$.method.innerHTML = txt;
  },

  _mark: function(query, str) {
    var i = str.indexOf(query);
    if (i === -1) {
      return null;
    }
    var txt = str.substr(0, i);
    txt += '<mark>';
    txt += str.substr(i, query.length);
    txt += '</mark>';
    txt += str.substr(i + query.length);
    return txt;
  }
});

/* global chance */
Polymer({
  is: 'api-search-panel',

  properties: {
    query: String,

    opened: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true
    },
    local: Array,
    exchange: Array,
    discovery: Array
  },

  observers: [
    '_query(query, opened)'
  ],

  _query: function(query, opened) {
    if (!query || !opened) {
      return;
    }
    // The element should send an event to the contoller element to query databases
    // Here it's only mock.

    this._mockData();
  },

  _mockData: function() {
    var q = this.query.toLowerCase();
    var _qPath = q.replace(/\s/gim, '/');
    var _qQuery = q.replace(/\s/gim, '+');
    var local = [];
    var exchange = [];
    var discovery = [];
    for (let i = 0; i < chance.integer({min: 3, max: 10}); i++) {
      local.push(this._genItem('history', _qPath, _qQuery));
    }
    for (let i = 0; i < chance.integer({min: 3, max: 10}); i++) {
      local.push(this._genItem('saved', _qPath, _qQuery));
    }
    for (let i = 0; i < chance.integer({min: 1, max: 5}); i++) {
      local.push(this._genItem('raml', _qPath, _qQuery));
    }

    for (let i = 0; i < chance.integer({min: 0, max: 5}); i++) {
      exchange.push(this._genItem('exchange', _qPath, _qQuery));
    }
    for (let i = 0; i < chance.integer({min: 0, max: 5}); i++) {
      discovery.push(this._genItem('discovery', _qPath, _qQuery));
    }

    this.local = local;
    this.exchange = exchange;
    this.discovery = discovery;
  },

  _genItem: function(source, path, query) {
    let opt = {};
    let url;
    if (chance.bool()) {
      opt.path = path;
      url = chance.url(opt);
    } else {
      url = chance.url();
      url += '?' + chance.word() + '=' + query + '+' + chance.word();
    }
    return {
      url: url,
      source: source,
      method: 'GET',
      name: chance.word()
    };
  },

  _computeLocalIcon: function(source) {
    switch (source) {
      case 'history':
        return 'arc:history';
      case 'saved':
        return 'save';
      case 'raml':
        return 'arc:mule';
    }
  },

  _shouldHideName: function(source) {
    return source === 'history';
  },

  _computeIconTitle: function(source) {
    switch (source) {
      case 'history':
        return 'From the history';
      case 'saved':
        return 'From locally saved request';
      case 'raml':
        return 'From project (RAML)';
    }
  },

  _openHelp: function(e) {
    e = Polymer.dom(e);
    var target = e.localTarget.dataset.target;
    switch (target) {
      case 'exchange':
        this.$.exchangeHelp.open();
        break;
      case 'discovery':
        this.$.discoveryHelp.open();
        break;
    }
  }
});

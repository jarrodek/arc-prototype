/* global chance */

Polymer({
  is: 'headers-sets-selector',

  properties: {
    isPayload: {
      type: Boolean,
      value: false
    },
    headersDefaults: {
      type: String,
      value: '',
      computed: '_computeHeadersDefaults(isPayload)'
    },
    customSets: Array,

    availableSets: {
      type: Array,
      value: [],
      readOnly: true
    }
  },

  attached: function() {
    this._generateRandomSets();
  },

  observers: [
    '_computeSets(headersDefaults, customSets.*)'
  ],

  /* Compute default headers string. */
  _computeHeadersDefaults: function(isPayload) {
    var list = [{
      name: 'accept',
      value: 'application/json'
    },{
      name: 'accept-encoding',
      value: 'gzip, deflate'
    },{
      name: 'accept-language',
      value: 'en-US,en;q=0.8'
    }];
    if (isPayload) {
      list[list.length] = {
        name: 'content-type',
        value: 'application/json'
      };
    }
    list[list.length] = {
      name: 'user-agent',
      value: navigator.userAgent
    };
    return list;
  },

  _generateRandomSets: function() {
    var setsNo = chance.integer({
      min: 2,
      max: 15
    });
    var list = [];
    for (var i = 0; i < setsNo; i++) {
      let name = chance.sentence({words: chance.integer({min: 2,max: 5})});
      let headers = this._generateHeaders();
      list.push({
        name: name,
        headers: headers,
        deletable: true,
        editable: true
      });
    }
    this.set('customSets', list);
  },

  _generateHeaders: function() {
    var headersSize = chance.integer({
      min: 2,
      max: 10
    });
    var headers = [];
    for (var i = 0; i < headersSize; i++) {
      headers.push({
        name: 'X-' + chance.word(),
        value: chance.word()
      });
    }
    return headers;
  },

  _computeSets: function(headersDefaults) {
    var list = [];
    list.push({
      name: 'Default Chrome headers',
      headers: headersDefaults,
      deletable: false,
      editable: false
    });
    list = list.concat(this.customSets);
    this._setAvailableSets(list);
  },

  _editSet: function() {
    this.$.notYetToast.open();
  },

  addSet: function() {
    this.$.notYetToast.open();
  },

  _deleteSet: function(e) {
    var i = this.$.repeater.indexForElement(e.target);
    this.splice('availableSets', i, 1);
  },

  _useSet: function(e) {
    var i = this.$.repeater.indexForElement(e.target);
    var headers = this.availableSets[i].headers;
    var txt = '';
    headers.forEach((item) => {
      txt += item.name + ': ' + item.value + '\n';
    });
    this.fire('headers-set-selected', {
      set: txt
    });
  }

});

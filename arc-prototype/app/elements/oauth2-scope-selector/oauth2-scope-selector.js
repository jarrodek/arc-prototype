Polymer({
  is: 'oauth2-scope-selector',

  properties: {
    // A list of scopes supported by the OAuth 2
    scopes: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
    }
  },

  _appendScope: function() {
    var value = this.$.scopeInput.value;
    if (!value) {
      this.$.noValueToast.open();
      return;
    }
    this.$.scopeInput.value = '';
    this.push('scopes', value);
  },

  // Remove scope button click handler
  _removeScope: function(e) {
    var item = this.$.scopeRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.scopes;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('scopes', index, 1);
  }

});

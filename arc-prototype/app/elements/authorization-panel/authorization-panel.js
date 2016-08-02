Polymer({
  is: 'authorization-panel',

  properties: {
    tabSelected: {
      type: Number,
      value: 0
    },

    enabledAuth: String
  },

  listeners: {
    'authorization-enabled': '_toggleAuthorizationState',
    'authorization-disabled': '_removeAuthType'
  },

  _toggleAuthorizationState: function(e) {
    this._disableCurrent();
    e = Polymer.dom(e);
    var target = e.rootTarget.nodeName.toLowerCase();
    switch (target) {
      case 'basic-auth-panel': this.enabledAuth = 'basic'; break;
      case 'oauth2-auth-panel': this.enabledAuth = 'oauth2'; break;
      case 'oauth1-auth-panel': this.enabledAuth = 'oauth1'; break;
      case 'ntlm-auth-panel': this.enabledAuth = 'ntlm'; break;
      case 'digest-auth-panel': this.enabledAuth = 'digest'; break;
      case 'pass-through-auth-panel': this.enabledAuth = 'passthrough'; break;
    }
  },

  _disableCurrent: function() {
    var current = this.enabledAuth;
    if (!current) {
      return;
    }
    if (current in this.$) {
      this.$[current].enabled = false;
    }
  },

  _isAuthEnabled: function(type, current) {
    return type === current;
  },

  _removeAuthType: function() {
    this.enabledAuth = '';
  }
});

Polymer({
  is: 'ntlm-auth-panel',

  behaviors: [ArcBehaviors.AuthPanelBehavior],

  properties: {
    username: String,
    password: String
  },

  observers: [
    '_dataChanged(username, password)',
    '_headerValueChanged(headerValue)'
  ],

  _dataChanged: function(username, password) {
    var enc = `${username}:${password}`;
    var value = 'Basic ' + btoa(enc);
    this._internalChange = true;
    this.set('headerValue', value);
    this._internalChange = false;
  },

  _headerValueChanged: function(newValue) {
    if (this._internalChange) {
      return;
    }
    if (newValue) {
      this.password = '';
      this.username = '';
      return;
    }
    newValue = newValue.replace('Basic ', '');
    newValue = newValue.replace('basic ', '');
    newValue = newValue.trim();
    let enc;
    try {
      enc = atob(newValue);
    } catch (e) {}
    if (enc) {
      let parts = enc.split(':');
      if (parts.length) {
        this.username = parts[0];
        if (parts[1]) {
          this.password = parts[1];
        }
      }
    }
  },

  clearUsername: function() {
    this.username = '';
  }
});

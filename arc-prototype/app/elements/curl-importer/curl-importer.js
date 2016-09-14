Polymer({
  is: 'curl-importer',

  behaviors: [
    Polymer.PaperDialogBehavior
  ],

  observers: [
    '_onOpen(opened)',
    '_cmdChanged(command)'
  ],

  listeners: {
    'iron-overlay-closed': '_dialogClosed'
  },

  properties: {
    command: String,
    hasParams: Boolean,
    url: String,
    headers: String,
    method: String,
    payload: String
  },

  _onOpen: function(opened) {
    if (opened) {
      this.command = '';
    }
  },

  _cmdChanged: function(command) {
    if (!command) {
      this.hasParams = false;
      return;
    }
  },

  _commandParsed: function(e) {
    var parsed = e.detail.data;
    if (!parsed) {
      this.hasParams = false;
      return;
    }
    this.hasParams = true;
    this.url = parsed.url;
    this.headers = parsed.headers.join('\n');
    this.method = parsed.method;
    this.payload = parsed.data.ascii;
    console.log('_commandParsed', parsed);
  },

  reset: function() {
    this.url = '';
    this.headers = '';
    this.method = '';
    this.payload = '';
  },

  _dialogClosed: function(e) {
    if (e.detail.canceled) {
      return;
    }
    this.fire('change-request', {
      url: this.url,
      headers: this.headers,
      method: this.method,
      payload: this.payload
    });
  }

});

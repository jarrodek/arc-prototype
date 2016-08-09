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
    }
  },

  /* Compute default headers string. */
  _computeHeadersDefaults: function(isPayload) {
    var txt = `accept: application/json
accept-encoding: gzip, deflate
accept-language: en-US,en;q=0.8\n`;
    if (isPayload) {
      txt += 'content-type: application/json\n';
    }
    txt += `user-agent: ${navigator.userAgent}`;
    return txt;
  },

  // Insert predefined default set into the editor
  _insertDefaultSet: function() {
    this.fire('headers-set-selected', {
      set: this.headersDefaults
    });
  },
});

/* global parseCurl */
Polymer({
  is: 'curl-parser',
  /**
   * Fires when the command has been parsed
   *
   * @event
   * @param {Object.<String, Object>} data Parsed data.
   */
  properties: {
    // The cURL command
    command: {
      type: String
    },

    // Latest parsed command.
    parsed: {
      type: Object,
      notify: true
    }
  },

  observers: [
    '_commandChanged(command)'
  ],

  _commandChanged: function(command) {
    var curlData = parseCurl(command);
    this.fire('parsed', {
      data: curlData
    });
    this.set('parsed', curlData);
  }
});

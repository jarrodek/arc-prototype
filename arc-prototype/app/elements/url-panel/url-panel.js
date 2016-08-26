Polymer({
  is: 'url-panel',

  properties: {
    /**
     * Entered by the user query. It can be either an URL or search query.
     */
    url: {
      type: String,
      notify: true
    },
    // If true the URL contains a query / path parameters.
    hasParameters: {
      type: Boolean,
      value: false,
      notify: true,
      readOnly: true
    }
  },

  observers: [
    'urlChanged(url)'
  ],

  listeners: {
    'rawInput.focus': '_inputFocus'
  },

  /**
   * Called when the user input some data into an URL input.
   * It performs a query to the data sources to find a match for given URL / query.
   *
   * @param {String} url New URL value.
   */
  urlChanged: function(url) {
    console.log('_urlChanged(url)', url);
  },

  _inputFocus: function() {
    this.openPanel();
  },

  openPanel: function() {
    var url = this.url;
    if (!url) {
      // open history
      this.$.listings.open();
    } else {
      console.log('URL panel not empty - TODO.');
    }
  }
});

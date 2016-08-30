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
    },

    opened: {
      type: Boolean,
      notify: true
    },

    urlSuggestions: Array
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
    if (url && url.startsWith('http')) {
      // search history and display url suggestions
      this.generateSuggestions();
    } else if (url && url.length > 2 && url[0] !== 'h' && url[1] !== 't') {
      // display search results.
      console.log('search!');
    } else {
      // close suggestions and search result panel
      console.log('close all');
    }
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
  },

  generateSuggestions: function() {
    var a = [
      'http://api.domain.com/',
      'http://api.domain.com/path',
      'http://api.domain.com/other/path',
      'http://api.domain.com/item',
      'http://api.domain.com/media/file',
      'http://api.domain.com/media/upload',
      'http://api.domain.com/people',
      'http://api.domain.com/people/{personId}',
      'http://api.domain.com/people/list',
      'https://api.my-server.com',
      'https://api.localhost',
      'https://api.some.origin.com',
      'http://api.x-domain.com'
    ];
    this.urlSuggestions = a;
    this.suggestionsOpened = true;
  }
});

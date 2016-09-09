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
      notify: true,
      readOnly: true
    },

    opened: {
      type: Boolean,
      notify: true
    },

    urlSuggestions: Array,
    suggestionsOpened: Boolean,
    searchOpened: Boolean,

    stopSuggestions: {
      type: Boolean,
      value: false
    },

    currentSuggestion: String,
    paramsEditorOpened: Boolean,
    uriParameters: Array
  },

  observers: [
    'urlChanged(url)',
    '_openedChanged(opened)'
  ],

  listeners: {
    'rawInput.focus': '_inputFocus',
    'rawInput.keydown': '_inputKey',
    'suggestion': '_onSuggestion',
    'search': '_searchForced'
  },

  /**
   * Called when the user input some data into an URL input.
   * It performs a query to the data sources to find a match for given URL / query.
   *
   * @param {String} url New URL value.
   */
  urlChanged: function(url) {
    // console.log('_urlChanged(url)', url);
    if (url) {
      if (!this.stopSuggestions) {
        this.debounce('query', () => this.generateSuggestions(), 500);
      }
      // Check if the url contains parameters
      this.checkParams();
    } else {
      // close suggestions and search result panel
      console.log('close all');
      this.closePanel();
    }
  },

  _inputFocus: function() {
    this.openPanel();
  },

  _inputKey: function(e) {
    switch (e.keyCode) {
      case 40: // down
        if (this.suggestionsOpened) {
          this.$.suggestions.moveDown();
          e.preventDefault();
        }
      break;
      case 38: // up
        if (this.suggestionsOpened) {
          this.$.suggestions.moveUp();
          e.preventDefault();
        }
      break;
      case 13: // enter
        if (this.suggestionsOpened) {
          this.$.suggestions.select();
          e.preventDefault();
        } else if (this.url) {
          try {
            new URL(this.url);
            console.warn('Fire request start');
          } catch (e) {
            // perform a search.
            this.search(this.url);
          }
        }
      break;
    }
  },

  _openedChanged: function(opened) {
    if (!opened) {
      this.closePanel();
    }
  },

  openPanel: function() {
    var url = this.url;
    if (!url) {
      // open history
      this.$.listings.open();
    } else {
      if (this.hasParameters) {
        // open params panel.
        this.paramsEditorOpened = true;
      }
    }
  },

  closePanel: function() {
    this.$.listings.close();
    this.suggestionsOpened = false;
    this.searchOpened = false;
    this.$.suggestions.reset();
  },

  generateSuggestions: function() {
    var p;
    if (this._cache) {
      p = Promise.resolve(this._cache);
    } else {
      p = fetch('./scripts/mock-history.json').then((response) => {
        return response.json();
      }).then((json) => this._cache = json);
    }

    p.then((json) => this.filter(this.url, json))
    .then((list) => {
      this.urlSuggestions = list;
      this.suggestionsOpened = list.length > 0;
    });
  },

  filter: function(query, list) {
    if (!query) {
      return [];
    }
    if (!list) {
      return [];
    }
    query = query.toLowerCase();
    return list.filter((i) => {
      var url = i.url.toLowerCase();
      return url.indexOf(query) !== -1;
    });
  },

  _onSuggestion: function(e) {
    var d = e.detail;
    // console.log('_onSuggestion', d);
    if (d.final) {
      this.stopSuggestions = true;
      this.url = d.url;
      this.stopSuggestions = false;
      this.$.listings.close();
    } else {
      this.currentSuggestion = d.url;
    }
  },

  search: function() {
    this.searchOpened = true;
  },

  _searchForced: function() {
    if (this.suggestionsOpened) {
      this.suggestionsOpened = false;
      this.$.suggestions.reset();
    }
    this.search();
  },

  checkParams: function() {
    if (this._internalChange) {
      return;
    }
    var url = this.url;
    if (!url) {
      this._setHasParameters(false);
      return;
    }
    if (this.uriParameters && this.uriParameters.length) {
      // if (this.hasParameters) {
      //   this._updateParams();
      //   return;
      // }
      this._origUrl = url;
      // this._params = {};
      this._setHasParameters(true);
      this._updateParams();
      return;
    }
    this._setHasParameters(false);
  },

  _paramChanged: function(e) {
    if (!this._params) {
      this._params = {};
    }
    this._params['{' + e.detail.param + '}'] = e.detail.value;
    this._updateParams();
  },

  _updateParams: function() {
    var url = this._origUrl;
    var matches = url.match(/({[a-zA-Z0-9]*})/gim);
    if (!matches) {
      return;
    }

    matches.forEach((match) => {
      var v = this._params[match];
      if (!v) {
        return;
      }
      url = url.replace(match, v);
    });
    this._internalChange = true;
    this.url = url;
    this._internalChange = false;
  }
});

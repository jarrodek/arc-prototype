Polymer({
  is: 'url-suggestions-panel',

  behaviors: [ArcBehaviors.UrlParserBehavior],

  properties: {
    opened: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true
    },
    // All possible suggestions for the current query.
    suggestions: Array,
    hasSuggestions: {
      type: Boolean,
      value: false,
      readOnly: true
    },
    // The URL user entered into the field.
    url: {
      type: String
    },
    // List of domains to display
    domains: Array,
    paths: Array,
    queries: Array,

    domain: String,
    path: String,

    hasDomainSelected: {
      type: Boolean,
      value: false
    },
    hasPathSelected: {
      type: Boolean,
      value: false
    },

    selectedDomain: {
      type: Number,
      value: -1
    },

    selectedPath: {
      type: Number,
      value: -1
    },

    selectedQuery: {
      type: Number,
      value: -1
    }
  },

  observers: [
    '_suggestionsChanged(suggestions.*)',
    '_domainChanged(domain)',
    '_pathChanged(path)'
  ],

  _suggestionsChanged: function() {
    var s = this.suggestions;
    this.reset();

    if (!s || !s.length) {
      this._setHasSuggestions(false);
      return;
    }

    var domains = [];
    s.forEach((item) => {
      var parser = this.parseUrl(item.url);
      if (!parser.protocol) {
        parser.protocol = 'http';
      }
      var a = parser.protocol + '://' + parser.authority;
      if (domains.indexOf(a) === -1) {
        domains.push(a);
      }
      item.details = {
        authority: a.toLowerCase(),
        path: parser.path ? parser.path.toLowerCase() : null,
        query: parser.query ? parser.query.toLowerCase() : null
      };
    });
    domains.sort();
    this.domains = domains;
    this.display = s;
    this._setHasSuggestions(s.length > 0);
  },

  _domainChanged: function(domain) {
    this.hasDomainSelected = !!domain;
  },

  _pathChanged: function(path) {
    this.hasPathSelected = !!path;
  },

  moveDown: function() {
    var list = this.$$(this._getListSelector());
    list.selectNext();
    list.selectedItem.scrollIntoViewIfNeeded();
  },

  moveUp: function() {
    var list = this.$$(this._getListSelector());
    list.selectPrevious();
    list.selectedItem.scrollIntoViewIfNeeded();
  },

  _getListSelector: function() {
    if (!this.hasDomainSelected) {
      return '#domainList';
    } else if (!this.hasPathSelected) {
      return '#pathList';
    }
    return '#queriesList';
  },

  // Accept current selection
  select: function() {
    if (!this.hasDomainSelected) {
      this._selectDomain();
    } else if (!this.hasPathSelected) {
      this._selectPath();
    } else {
      this._selectUrl();
    }
  },

  _selectDomain: function() {
    if (this.selectedDomain === -1) {
      this.fire('search');
      return;
    }
    var domain = this.domains[this.selectedDomain].toLowerCase();
    var display = this.display.filter((item) => item.details.authority === domain);
    if (display.length === 1) {
      // chnage url and exit
      this.fire('suggestion', {
        url: display[0].url,
        final: true
      });
      this.opened = false;
      this.reset();
      return;
    }
    var paths = [];
    display.forEach((i) => {
      if (paths.indexOf(i.details.path) === -1) {
        paths.push(i.details.path);
      }
    });
    this.paths = paths;
    this.domain = domain;
    this.display = display;
    this.fire('suggestion', {
      url: domain,
      final: false
    });
  },

  _selectPath: function() {
    var path = this.paths[this.selectedPath];
    var display = this.display.filter((item) => item.details.path === path);
    if (display.length === 1) {
      // chnage url and exit
      this.fire('suggestion', {
        url: display[0].url,
        final: true
      });
      this.opened = false;
      this.reset();
      return;
    }
    var queries = [];
    display.forEach((i) => {
      var q = i.details.query;
      if (!q) {
        q = '';
      }
      if (queries.indexOf(q) === -1) {
        queries.push(q);
      }
    });
    this.display = display;
    this.queries = queries;
    this.path = path;
    this.fire('suggestion', {
      url: this.domain + path,
      final: false
    });
  },

  _selectUrl: function() {
    var query = this.queries[this.selectedQuery];
    var display = this.display.filter((item) => item.details.query === query);
    this.fire('suggestion', {
      url: display[0].url,
      final: true
    });
    this.opened = false;
    this.reset();
  },

  _computeClass: function(isDomain, isPath) {
    var clazz = 'content';
    if (isDomain) {
      clazz += ' domain';
    }
    if (isPath) {
      clazz += ' path';
    }
    return clazz;
  },

  _computeDisplayPaths: function(hasDomainSelected, hasPathSelected) {
    return hasDomainSelected && !hasPathSelected;
  },

  _computeDisplayQueries: function(hasDomainSelected, hasPathSelected) {
    return hasDomainSelected && hasPathSelected;
  },

  reset: function() {
    this.domains = [];
    this.paths = [];
    this.queries = [];
    this.domain = '';
    this.path = '';
    this.selectedDomain = -1;
    this.selectedPath = -1;
    this.selectedQuery = -1;
  }
});

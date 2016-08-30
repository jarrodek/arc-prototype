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
    url: String,
    // List of domains to display
    domains: Array,
    // Selected domain
    domain: String,

    domainSelected: {
      type: Boolean,
      value: false,
      readOnly: true
    }
  },

  observers: [
    '_suggestionsChanged(suggestions.*)',
    '_domainChanged(domain)'
  ],

  _suggestionsChanged: function() {
    var s = this.suggestions;
    if (!s || !s.length) {
      this._setHasSuggestions(false);
      return;
    }
    var domains = [];
    s.forEach((item) => {
      var parser = this.parseUrl(item);
      var a = parser.protocol + '://' + parser.authority;
      if (domains.indexOf(a) === -1) {
        domains.push(a);
      }
    });
    domains.sort();
    this.domains = domains;
    this._setHasSuggestions(true);
  },

  _domainChanged: function(domain) {
    var state = !!(domain && domain.length);
    this._setDomainSelected(state);
  }
});

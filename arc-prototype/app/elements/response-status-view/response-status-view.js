Polymer({
  is: 'response-status-view',

  behaviors: [ArcBehaviors.HeadersParserBehavior],

  properties: {
    // A status code part of the status header.
    statusCode: {
      type: Number
    },
    // A status message part of the status header.
    statusMessage: String,
    // Calculated loading time.
    loadingTime: Number,
    // An array of the response headers.
    responseHeaders: Array,
    // A headers object of tge request headers
    requestHeaders: Headers,
    // Raw HTTP message sent to the server.
    httpMessage: {
      type: String,
      value: function() {
        return 'Message wasn\'t sent';
      }
    },
    // Calculated to be true if responseError object is set.
    // Array of the request headers.
    requestHeadersArray: {
      type: Array,
      computed: '_computeRequestHeaders(requestHeaders)'
    },
    // An array of redirect responses.
    redirectData: {
      type: Array,
      value: []
    },
    // Currently selected tab.
    selectedTab: {
      type: Number,
      value: 0
    },
    // HAR timings object to display
    requestTimings: {
      type: Object,
      notify: true
    },
    // Timing of the final response (excluding redirects).
    redirectTimings: {
      type: Array,
      value: function() {
        return [];
      }
    },
    // True if there are redirects data available.
    hasRedirects: {
      type: Boolean,
      value: false,
      readOnly: true
    },
    // True if there was a response headers. False when error.
    hasResponseHeaders: {
      type: Boolean,
      value: false,
      readOnly: true
    }
  },

  observers: [
    '_checkHttpMessage(httpMessage.*)',
    '_computeHasResponseHeaders(responseHeaders)',
    '_updateTabs(responseHeaders)'
  ],

  attached: function() {
    this._checkHttpMessage();
  },

  _updateTabs: function() {
    this.$.tabs.notifyResize();
  },

  _checkHttpMessage: function() {
    if (!!this.httpMessage) {
      return;
    }
    this.set('httpMessage', 'Message wasn\'t sent');
  },
  _computeStatusClass: function(code) {
    var cls = 'status-color';
    if (code >= 500 || code === 0) {
      cls += ' error';
    }
    if (code >= 400 && code < 500) {
      cls += ' warning';
    }
    return cls;
  },

  showStatusInfo: function() {
    this.$.statusCodeInfo.open();
  },

  _computeRequestHeaders: function(requestHeaders) {
    return this.headersToJSON(requestHeaders);
  },

  _computeHasResponseHeaders: function(responseHeaders) {
    var res = !!(responseHeaders && responseHeaders.length);
    this._setHasResponseHeaders(res);
  },

  _computeBageClass: function(cnt) {
    return cnt === 0 ? 'empty' : '';
  }

});

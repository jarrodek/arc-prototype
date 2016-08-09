(function() {
'use strict';

/* global CodeMirror, ArcBehaviors */
Polymer({
  is: 'headers-editor',

  behaviors: [ArcBehaviors.HeadersParserBehavior],

  properties: {
    /**
     * A HTTP headers message part as defined in HTTP spec.
     *
     * @type {String}
     */
    headers: {
      type: String,
      notify: true
    },
    /**
     * A value of a Content-Type header.
     * This can be changed externally and the editor will reflect the change.
     *
     * @type {Stirng}
     */
    contentType: {
      type: String,
      notify: true,
      observer: '_onContentTypeChanged'
    },

    isPayload: {
      type: Boolean,
      value: false,
      observer: '_isPayloadChanged'
    },
    tabSelected: {
      type: Number,
      value: 0,
      observer: '_selectedTabChanged'
    },
    headersList: {
      type: Array,
      value: []
    }
  },
  observers: [
    '_headersChanged(headers)',
    'updateHeaders(headersList.*)'
  ],

  listeners: {
    'iron-overlay-closed': '_headersSupportClosed'
  },

  ready: function() {
    this.$.cm.setOption('extraKeys', {
      'Ctrl-Space': function(cm) {
        CodeMirror.showHint(cm, CodeMirror.hint['http-headers'], {
          container: Polymer.dom(this.root)
        });
      }.bind(this)
    });
    this.$.cm.editor.on('header-value-support', (e) => this.onCodeMirrorHeadersSupport(e));
  },
  // Handler for code-mirror header hints selected.
  onCodeMirrorHeadersSupport: function(init) {
    if (!init.type || !init.type.call) {
      return;
    }
    var openResult;
    switch (init.type.call) {
      case 'authorizationBasic':
        openResult = this._openCmBasicAuth();
        break;
      case 'cookie':
        openResult = this._openCmCookies();
        break;
    }
    if (openResult) {
      this.cmSupportData = init;
    } else {
      this.cmSupportData = null;
    }
  },

  _headersSupportClosed: function(e) {
    if (e.detail.canceled) {
      if (this.cmSupportData) {
        this.cmSupportData = null;
      }
      return;
    }
    var init = this.cmSupportData;
    this.cmSupportData = null;
    if (!init) {
      return;
    }
    var elm;
    var value;
    switch (init.type.call) {
      case 'authorizationBasic':
        elm = this.__getSupportElmForHeader('authorization');
        if (elm) {
          value = elm.value;
          if (value) {
            value = value.replace('Basic ', '');
          }
        }
        break;
      case 'cookie':
        elm = this.__getSupportElmForHeader('cookie');
        if (elm) {
          value = elm.value;
        }
    }
    if (!elm || !value) {
      return;
    }
    this.$.cm.editor.replaceSelection(value);
    // console.log('_headersSupportClosed', e);
  },
  // Open basic auth support for code mirror.
  _openCmBasicAuth: function() {
    var elm = this.__getSupportElmForHeader('authorization');
    if (!elm) {
      return false;
    }
    elm.target = undefined;
    elm.model = undefined;
    elm.provideSupport();
    return true;
  },

  // Open cookies support for code mirror.
  _openCmCookies: function() {
    var elm = this.__getSupportElmForHeader('cookie');
    if (!elm) {
      return false;
    }
    elm.target = undefined;
    elm.model = undefined;
    elm.provideSupport();
    return true;
  },

  /**
   * Called by CodeMirror editor.
   * When something change n the headers list, detect content type header.
   */
  valueChanged: function() {
    this._detectContentType();
  },
  /**
   * Insert a Content-Type header into a headers list if it is not on the list already.
   *
   * This function uses `contentType` value for the header.
   * If it is not defined then an warning message will be shown.
   */
  ensureContentTypeHeader: function() {
    var arr = this.headersToJSON(this.headers);
    var ct = this.getContentType(arr);
    if (!!ct) {
      this.hideWarningn('content-type-missing');
      return;
    }
    if (!this.contentType) {
      this.displayWarning('content-type-missing');
      return;
    } else {
      this.hideWarningn('content-type-missing');
    }
    arr.push({
      name: 'Content-Type',
      value: this.contentType
    });
    var headers = this.headersToString(arr);
    this.set('headers', headers);
  },
  /**
   * Display a dialog with error message.
   *
   * @param {String} type A predefined type to display.
   */
  displayWarning: function(type) {
    console.warn('Content type header not present but it should be: ' + type);
  },
  hideWarningn: function(type) {
    console.info('Content type header is present now: ' + type);
  },
  /**
   * Update headers array from form values to the HTTP string.
   */
  updateHeaders: function() {
    if (!this.headersList) {
      return;
    }
    var headers = this.headersToString(this.headersList);
    this.set('headers', headers);
  },

  _detectContentType: function() {
    if (!this.headers && this.contentType) {
      this.set('contentType', null);
      return;
    }
    if (!this.headers) {
      if (this.isPayload) {
        this.displayWarning('content-type-missing');
      }
      return;
    }
    var ct = this.getContentType(this.headers);
    if (!ct) {
      if (this.isPayload) {
        this.displayWarning('content-type-missing');
      }
      return;
    }
    this.set('contentType', ct);
    this.hideWarningn('content-type-missing');
  },

  _isPayloadChanged: function() {
    if (this.isPayload) {
      this.ensureContentTypeHeader();
    }
  },

  _onContentTypeChanged: function() {
    if (!this.isPayload || !this.contentType) {
      return;
    }
    var arr = this.headersToJSON(this.headers);
    var updated = false;
    var notChanged = false; //True when values are equal, no change needed.
    arr.map(function(item) {
      if (updated || item.name.toLowerCase() !== 'content-type') {
        return item;
      }
      updated = true;
      if (item.value === this.contentType) {
        notChanged = true;
        return item;
      }
      item.value = this.contentType;
      return item;
    }.bind(this));
    if (notChanged) {
      return;
    }
    if (!updated) {
      arr.push({
        name: 'Content-Type',
        value: this.contentType
      });
    }
    var headers = this.headersToString(arr);
    this.set('headers', headers);
  },
  /** Called when tab selection changed */
  _selectedTabChanged: function(newVal, oldVal) {
    var tabName;
    switch (newVal) {
      case 0:
        if (oldVal === 1) {
          this.updateHeaders();
        }
        this.$.cm.editor.refresh();
        tabName = 'Raw tab';
        break;
      case 1:
        this._setHeadersList();
        tabName = 'Form tab';
        break;
      case 2:
        tabName = 'Predefined tab';
        break;
    }
  },

  _headersChanged: function(headers) {
    if (this.tabSelected !== 1) {
      return;
    }
    // it may come from updating a form value or from swithing to different request.
    // See: https://github.com/jarrodek/ChromeRestClient/issues/439
    var listHeaders = this.headersToString(this.headersList);
    if (listHeaders !== headers) {
      this._setHeadersList();
    }
  },
  // Populate form with current headers.
  _setHeadersList: function() {
    var arr = this.headersToJSON(this.headers);
    if (!arr || !arr.length) {
      arr = [{
        name: '',
        value: ''
      }];
    }
    this.set('headersList', arr);
  },

  // Insert predefined default set into the editor
  _insertDefaultSet: function(e) {
    var set = e.detail.set;
    var headers = this.headers;
    if (headers && headers[headers.length - 1] !== '\n') {
      headers += '\n';
    }
    headers += set;
    this.set('headers', headers);
    this.tabSelected = 0;
  },

  __getSupportElmForHeader: function(headerName) {
    if (headerName) {
      headerName = headerName.toLowerCase();
    }
    var query = `*[header-support="${headerName}"]`;
    return Polymer.dom(this.root).querySelector(query);
  }

});
})();

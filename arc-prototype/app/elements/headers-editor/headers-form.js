Polymer({
  is: 'headers-form',

  properties: {
    headersList: {
      type: Array,
      notify: true
    },
    /**
     * It is currently focused input field for header name.
     * This field will receive autocomplete support.
     * @type {HTMLElement}
     */
    activeHeaderNameField: {
      type: HTMLElement,
      readOnly: true
    },
    /**
     * Active autocomplete element.
     *
     * @type {HTMLElement}
     */
    activeAutocompleteNameField: {
      type: HTMLElement,
      readOnly: true
    }
  },

  observers: [
    '_headerValuesChanged(headersList.*)'
  ],

  _headerValuesChanged: function(record) {
    if (record && record.path && record.path === 'headersList.length') {
      // Not interested in it.
      return;
    }
    // path == 'headersList' means the object was initialized.
    if (!record || !record.path || record.path === 'headersList') {
      //initilize headers support
      this.async(() => {
        record.value.forEach((header, index) => {
          this.__provideSupport(header.name, index);
        });
      });
      // console.log('aaaaaa',record);
      return;
    }
    // console.log('aaaaaa',record);
    // this.updateHeaders();
    this._provideSupport(record);
  },

  /** Called when headers form has renederd. */
  _onHeadersFormRender: function() {
    if (!this.root) {
      return;
    }
    var row = Polymer.dom(this.root).querySelectorAll('.headers-form .form-row');
    if (!row || !row.length) {
      return;
    }
    row = row.pop();
    try {
      row.children[0].children[0].focus();
    } catch (e) {

    }
  },

  _headerNameFocus: function(e) {
    var index = this.$.headersList.indexForElement(e.target);
    var elm = Polymer.dom(this.root)
      .querySelector('.headers-form .form-row:nth-child(' + (index + 1) + ') paper-autocomplete');
    if (!elm) {
      console.warn('Autocomplete element not found.');
      return;
    }
    elm.target = e.target;
    this._setActiveHeaderNameField(e.target);
    this._setActiveAutocompleteNameField(elm);
    // console.log(e.target, elm);
  },

  _openHeaderSupport: function(e) {
    var item = this.$.headersList.itemForElement(e.target);
    var elm = this.__getSupportElmForHeader(item.name);
    if (!elm) {
      console.error('No support for given header', e);
      return;
    }
    var index = this.$.headersList.indexForElement(e.target);
    var input = Polymer.dom(this.root)
      .querySelector('.headers-form .form-row:nth-child(' + (index + 1) +
        ') input[name="headerValue"]');
    if (!input) {
      console.error('Input field has not been found.');
      return;
    }
    var model = this.$.headersList.modelForElement(e.target);
    elm.target = input;
    elm.model = model;
    elm.provideSupport();
  },

  __getSupportElmForHeader: function(headerName) {
    if (headerName) {
      headerName = headerName.toLowerCase();
    }
    var query = `*[header-support="${headerName}"]`;
    return Polymer.dom(this.root).querySelector(query);
  },

  __provideSupport: function(headerName, index) {
    var parent = Polymer.dom(this.root)
      .querySelector('.headers-form .form-row:nth-child(' + (index + 1) + ')');
    if (!parent) {
      return;
    }
    var elm = this.__getSupportElmForHeader(headerName);
    // console.log('Header ', headerName, ' at index ', index, elm ? 'has' : 'has no', 'support');
    if (!elm) {
      parent.classList.remove('has-support');
    } else {
      parent.classList.add('has-support');
    }
  },

  /**
   * Called when the headers list has changed.
   * Detect header name and check if support for this header exists.
   */
  _provideSupport: function(record) {
    var path = record.path;
    if (path.indexOf('name') === -1) {
      return;
    }
    var value = record.value;
    if (value) {
      value = value.toLowerCase();
    }

    var all = record.base;
    var len = all.length;
    var index;
    for (var i = 0; i < len; i++) {
      if (all[i].name === record.value) {
        index = i;
        break;
      }
    }
    if (index === undefined) {
      return;
    }
    this.__provideSupport(value, index);
  },

  /**
   * A handler called when the user selects a suggestion.
   * @param {[type]} e [description]
   * @return {[type]}
   */
  _onHeaderNameSelected: function(e) {
    var value = e.detail.value;
    var index = this.$.headersList.indexForElement(this.activeHeaderNameField);
    if (index || index === 0) {
      this.set(['headersList', index, 'name'], value);
    }
  },

  /**
   * Handler for autosuggestion element.
   * It takes value from currently focused header name element (input) and query the datastore
   * for suggestions.
   *
   * @param {Event} e Autocomplete event
   */
  _queryHeaderName: function(e) {
    var value = e.detail.value;
    if (!value) {
      this.activeAutocompleteNameField.source = [];
      return;
    }
    var suggestions = this._getHeadrNamesSuggestions();
    this._setNameSuggestions({
      detail: {
        data: suggestions
      }
    });
    // TODO: suggestions
    // this.$.headerModel.objectId = value;
    // this.$.headerModel.queryAutocomplete();
  },
  /**
   * Handler for model's data ready event.
   * This method sets received values into the suggestions of header name field.
   *
   * @param {Event} e The `data-ready` event of the model.
   */
  _setNameSuggestions: function(e) {
    var data = e.detail.data;
    if (!data) {
      this.activeAutocompleteNameField.source = [];
      return;
    }
    var suggestions = data.map((item) => item.key);
    this.activeAutocompleteNameField.source = suggestions;
  },

  _removeHeader: function(e) {
    var index = this.$.headersList.indexForElement(e.target);
    this.splice('headersList', index, 1);
    // this.updateHeaders();
  },

  appendEmptyHeader: function() {
    var item = {
      name: '',
      value: ''
    };
    this.push('headersList', item);
  },

  _getHeadrNamesSuggestions: function() {
    var list = [{
      'key': 'Accept',
      'desc': 'Content-Types that are acceptable.',
      'example': 'Accept: text/plain'
    }, {
      'key': 'Accept-Charset',
      'desc': 'Character sets that are acceptable',
      'example': 'Accept-Charset: utf-8'
    }, {
      'key': 'Accept-Encoding',
      'desc': 'Acceptable encodings',
      'example': 'Accept-Encoding: &lt;compress | gzip | deflate | identity&gt;'
    }, {
      'key': 'Accept-Language',
      'desc': 'Acceptable languages for response',
      'example': 'Accept-Language: en-US'
    }, {
      'key': 'Authorization',
      'desc': 'Authentication credentials for HTTP authentication',
      'example': 'Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
    }, {
      'key': 'Cache-Control',
      'desc': 'Used to specify directives that MUST be obeyed by all caching mechanisms along ' +
        'the request/response chain',
      'example': 'Cache-Control: no-cache'
    }, {
      'key': 'Connection',
      'desc': 'What type of connection the user-agent would prefer',
      'example': 'Connection: close'
    }, {
      'key': 'Cookie',
      'desc': 'an HTTP cookie previously sent by the server with Set-Cookie',
      'example': 'Cookie: $Version=1; Skin=new;'
    }, {
      'key': 'Content-Length',
      'desc': 'The length of the request body in octets (8-bit bytes)',
      'example': 'Content-Length: 348'
    }, {
      'key': 'Content-Type',
      'desc': 'The mime type of the body of the request (used with POST and PUT requests)',
      'example': 'Content-Type: application/x-www-form-urlencoded'
    }, {
      'key': 'Date',
      'desc': 'The date and time that the message was sent',
      'example': 'Date: Tue, 15 Nov 1994 08:12:31 GMT'
    }, {
      'key': 'Expect',
      'desc': 'Indicates that particular server behaviors are required by the client',
      'example': 'Expect: 100-continue'
    }, {
      'key': 'From',
      'desc': 'The email address of the user making the request',
      'example': 'From: user@example.com'
    }, {
      'key': 'Host',
      'desc': 'The domain name of the server (for virtual hosting), mandatory since HTTP/1.1',
      'example': 'Host: en.wikipedia.org'
    }, {
      'key': 'If-Match',
      'desc': 'Only perform the action if the client supplied entity matches the same entity on ' +
        'the server. This is mainly for methods like PUT to only update a resource if it has ' +
        'not been modified since the user last updated it.',
      'example': 'If-Match: \'737060cd8c284d8af7ad3082f209582d\''
    }, {
      'key': 'If-Modified-Since',
      'desc': 'Allows a 304 Not Modified to be returned if content is unchanged',
      'example': 'If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT'
    }, {
      'key': 'If-None-Match',
      'desc': 'Allows a 304 Not Modified to be returned if content is unchanged, see HTTP ETag',
      'example': 'If-None-Match: \'737060cd8c284d8af7ad3082f209582d\''
    }, {
      'key': 'If-Range',
      'desc': 'If the entity is unchanged, send me the part(s) that I am missing; otherwise, ' +
        'send me the entire new entity',
      'example': 'If-Range: \'737060cd8c284d8af7ad3082f209582d\''
    }, {
      'key': 'If-Unmodified-Since',
      'desc': 'Only send the response if the entity has not been modified since a specific time.',
      'example': 'If-Unmodified-Since: Sat, 29 Oct 1994 19:43:31 GMT'
    }, {
      'key': 'Max-Forwards',
      'desc': 'Limit the number of times the message can be forwarded through proxies or gateways.',
      'example': 'Max-Forwards: 10'
    }, {
      'key': 'Pragma',
      'desc': 'Implementation-specific headers that may have various effects anywhere along the ' +
        'request-response chain',
      'example': 'Pragma: no-cache'
    }, {
      'key': 'Proxy-Authorization',
      'desc': 'Authorization credentials for connecting to a proxy.',
      'example': 'Proxy-Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='
    }, {
      'key': 'Range',
      'desc': 'Request only part of an entity. Bytes are numbered from 0.',
      'example': 'Range: bytes=500-999'
    }, {
      'key': 'Referer',
      'desc': 'This is the address of the previous web page from which a link to the currently ' +
        'requested page was followed.',
      'example': 'Referer: http://en.wikipedia.org/wiki/Main_Page'
    }, {
      'key': 'TE',
      'desc': 'The transfer encodings the user agent is willing to accept: the same values as ' +
        'for the response header Transfer-Encoding can be used, plus the \'trailers\' value ' +
        '(related to the \'chunked\' transfer method) to notify the server it accepts to ' +
        'receive additional headers (the trailers) after the last, zero-sized, chunk.',
      'example': 'TE: trailers, deflate'
    }, {
      'key': 'Upgrade',
      'desc': 'Ask the server to upgrade to another protocol',
      'example': 'Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11'
    }, {
      'key': 'User-Agent',
      'desc': 'The user agent string of the user agent',
      'example': 'User-Agent: Mozilla/5.0 (Linux; X11)'
    }, {
      'key': 'Via',
      'desc': 'Informs the server of proxies through which the request was sent.',
      'example': 'Via: 1.0 fred, 1.1 nowhere.com (Apache/1.1)'
    }, {
      'key': 'Warning',
      'desc': 'A general warning about possible problems with the entity body.',
      'example': 'Warning: 199 Miscellaneous warning'
    }];
    return list;
  }
});

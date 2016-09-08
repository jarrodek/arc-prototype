/* global CodeMirror, ArcBehaviors */

Polymer({
  is: 'raml-request-headers-editor',
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
    tabSelected: {
      type: Number,
      value: 0,
      // observer: '_selectedTabChanged'
    },

    ramlHeaders: Object,
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
    }
  },

  observers: [
    '_ramlHeadersChanged(ramlHeaders.*)'
  ],

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

  _ramlHeadersChanged: function() {
    var h = this.ramlHeaders;
    if (!h) {
      return;
    }
    console.log('_ramlHeadersChanged', h);
  },

  /**
   * Called by CodeMirror editor.
   * When something change n the headers list, detect content type header.
   */
  valueChanged: function() {
    this._detectContentType();
  },

  _detectContentType: function() {
    if (!this.headers && this.contentType) {
      this.set('contentType', null);
      return;
    }
    if (!this.headers) {
      if (this.isPayload) {
        // this.displayWarning('content-type-missing');
      }
      return;
    }
    var ct = this.getContentType(this.headers);
    if (!ct) {
      if (this.isPayload) {
        // this.displayWarning('content-type-missing');
      }
      return;
    }
    this.set('contentType', ct);
    // this.hideWarningn('content-type-missing');
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
});

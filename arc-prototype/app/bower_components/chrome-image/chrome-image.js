Polymer({
  is: 'chrome-image',
  properties: {
    alt: String,
    preventLoad: Boolean,
    position: String,
    sizing: String,
    preload: Boolean,
    placeholder: String,
    fade: Boolean,
    loaded: {
      type: Boolean,
      notify: true
    },
    loading: {
      type: Boolean,
      notify: true
    },
    error: {
      type: Boolean,
      notify: true
    },
    width: Number,
    height: Number,
    /**
     * If set it will be displayed as an image.
     */
    blob: {
      type: Blob,
      observer: '_blobChanged'
    },
    /**
     * The URL of an image.
     */
    src: {
      type: String,
      observer: '_srcChanged'
    },
    /**
     * Local data URL to display an image.
     */
    localSrc: {
      type: String,
      readOnly: true
    }
  },

  detached: function() {
    this._clean();
  },

  _blobChanged: function() {
    this.set('src', undefined);
    if (this.blob) {
      this._resize();
      this._setLocalSrc(window.URL.createObjectURL(this.blob));
    }
  },

  _imageResponse: function(e) {
    this.set('blob', e.detail.response);
  },

  _imageError: function(e) {
    this.set('blob', undefined);
    console.error('chrome-image-error', e);
    this.fire('error', e);
  },

  _srcChanged: function() {
    this._clean();
    this._setLocalSrc('');
  },

  _clean: function() {
    if (this.localSrc) {
      window.URL.revokeObjectURL(this.localSrc);
    }
  },

  _resize: function() {
    var rect = this.getClientRects();
    if (rect && rect[0] && rect[0].width) {
      this.set('width', rect[0].width);
      this.set('height', rect[0].height);
    }
  }
});

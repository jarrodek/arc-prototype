Polymer({
  is: 'markdown-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    // The documentation text
    value: {
      type: String,
      value: '',
      notify: true
    },
    // A code mirror theme name
    theme: {
      type: String,
      value: 'base16-light'
    }
  },

  observers: [
    '_opened(opened)'
  ],

  _opened: function(opened) {
    if (opened) {
      this.debounce('cm-refresh', function() {
        this.$.cm.editor.refresh();
      }, 100);
    }
  },

  cancel: function() {
    this.fire('markdown-cancel');
    this.opened = false;
  },

  save: function() {
    this.fire('markdown-save', {
      value: this.value
    });
    this.opened = false;
  }

});

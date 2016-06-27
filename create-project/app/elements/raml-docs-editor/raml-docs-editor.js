Polymer({
  is: 'raml-docs-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    // True if the editor is opened.
    opened: {
      type: Boolean,
      notify: true
    },
    // The documentation body.
    markdownText: String,
    docName: {
      type: String,
      value: 'My doc name'
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

  save: function() {
    this.opened = false;
    this.fire('documentation-saved', {
      markdown: this.markdownText,
      name: this.docName
    });
  },

  cancel: function() {
    this.opened = false;
  }
});

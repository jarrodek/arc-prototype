Polymer({
  is: 'raml-editor-basic',

  properties: {
    basicFields: {
      type: Boolean,
      value: true
    },
    // The documentation node of the RAML file.
    documentation: {
      type: Array,
      value: function() {
        return [];
      }
    },
    // True if has documentation nodes.
    hasDocs: {
      type: Boolean,
      value: false,
      readOnly: true
    }
  },

  observers: [
    '_docsChanged(documentation.*)'
  ],

  // Show advanced editor - full form.
  showAdvanced: function() {
    this.basicFields = false;
  },

  openDocsEditor: function() {
    this.$.docsEditor.open();
  },

  _onSavedDocumentation: function(e) {
    if (this.editingDocs) {
      this.editingDocs = false;
      let i = this.editingDocsIndex;
      this.editingDocsIndex = undefined;
      this.set('documentation.' + i, e.detail);
      return;
    }
    this.push('documentation', e.detail);
  },

  _docsChanged: function() {
    var docs = this.documentation;
    var exists = docs && docs.length && docs.length > 0;
    this._setHasDocs(exists);
  },

  _onDocsDelete: function(e) {
    var item = this.$.docsRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.documentation;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('documentation', index, 1);
  },

  _onDoscEdit: function(e) {
    var item = this.$.docsRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.documentation;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.editingDocs = true;
    this.editingDocsIndex = index;
    this.$.docsEditor.markdownText = item.markdown;
    this.$.docsEditor.docName = item.name;
    this.$.docsEditor.open();
  }
});

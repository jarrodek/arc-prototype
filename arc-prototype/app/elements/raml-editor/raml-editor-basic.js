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
      },
      notify: true
    },
    // True if has documentation nodes.
    hasDocs: {
      type: Boolean,
      value: false,
      readOnly: true,
      notify: true
    },
    // The security schemes node of the RAML file.
    securitySchemas: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
    },
    // True if has the security schema(s) defined.
    hasSecuritySchemas: {
      type: Boolean,
      value: false,
      readOnly: true,
      notify: true
    },
    // The type node of the RAML file.
    types: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
    },
    // True if has at least one type.
    hasTypes: {
      type: Boolean,
      value: false,
      readOnly: true,
      notify: true
    },
    // The trits node of the RAML file.
    traits: {
      type: Array,
      value: function() {
        return [];
      },
      notify: true
    },
    // True if has at least one trit.
    hasTraits: {
      type: Boolean,
      value: false,
      readOnly: true,
      notify: true
    },
    // True when the tutorial should be displayed.
    onboarding: {
      type: Boolean,
      value: false
    },
    // API name
    name: {
      type: String,
      notify: true
    },
    // API description
    description: {
      type: String,
      notify: true
    },
    // API base URL
    baseUrl: {
      type: String,
      notify: true
    },
    // API version,
    version: {
      type: String,
      notify: true
    },
    // Content tyoes of the APIs
    mediaType: {
      type: String,
      notify: true
    },

    // Description input element.
    descInput: {
      type: HTMLElement,
      value: function() {
        return this.$.descInput;
      }
    }
  },

  observers: [
    '_docsChanged(documentation.*)',
    '_secSchemasChanged(securitySchemas.*)',
    '_typesChanged(types.*)',
    '_traitsChanged(traits.*)',
    '_valueChanged(name)',
    '_valueChanged(description)',
    '_valueChanged(baseUrl)',
    '_valueChanged(version)',
    '_valueChanged(hasDocs, hasSecuritySchemas)',
    '_valueChanged(mediaType)'
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

  _typesChanged: function() {
    var t = this.types;
    var exists = t && t.length && t.length > 0;
    this._setHasTypes(exists);
  },

  _traitsChanged: function() {
    var t = this.traits;
    var exists = t && t.length && t.length > 0;
    this._setHasTraits(exists);
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
  },

  // Open security scheme screen.
  openSecuritySchemeEditor: function() {
    this.$.securitySchemeEditor.open();
  },

  _onSecuritySchemeSaved: function(e) {
    if (this.editingSecSchemas) {
      this.editingSecSchemas = false;
      let i = this.editingSecSchemasIndex;
      this.editingSecSchemasIndex = undefined;
      this.set('securitySchemas.' + i, e.detail);
      return;
    }
    this.push('securitySchemas', e.detail);
  },

  _secSchemasChanged: function() {
    var ss = this.securitySchemas;
    var exists = ss && ss.length && ss.length > 0;
    this._setHasSecuritySchemas(exists);
  },

  _onSecSchemaEdit: function(e) {
    var item = this.$.ssRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.securitySchemas;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.editingSecSchemas = true;
    this.editingSecSchemasIndex = index;
    this.$.securitySchemeEditor.type = item.type;
    this.$.securitySchemeEditor.displayName = item.displayName;
    this.$.securitySchemeEditor.description = item.description;
    this.$.securitySchemeEditor.requestTokenUri = item.requestTokenUri;
    this.$.securitySchemeEditor.authorizationUri = item.authorizationUri;
    this.$.securitySchemeEditor.tokenCredentialsUri = item.tokenCredentialsUri;
    this.$.securitySchemeEditor.signatures = item.signatures;
    this.$.securitySchemeEditor.authorizationGrants = item.authorizationGrants;
    this.$.securitySchemeEditor.scopes = item.scopes;
    this.$.securitySchemeEditor.headers = item.headers;
    this.$.securitySchemeEditor.queryParams = item.queryParams;
    this.$.securitySchemeEditor.open();
  },

  _onSecSchemaDelete: function(e) {
    var item = this.$.ssRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.securitySchemas;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('securitySchemas', index, 1);
  },

  _valueChanged: function() {
    var hasValues = /*!!this.name ||
      !!this.description ||
      !!this.baseUrl ||
      !!this.version ||
      !!this.mediaType || */
      !!this.hasDocs ||
      !!this.hasSecuritySchemas ||
      !!this.hasTypes ||
      !!this.traits;
    // console.log('_valueChanged');
    if (hasValues && !this.onboarding) {
      this.onboarding = true;
    } else if (!hasValues && this.onboarding) {
      this.onboarding = false;
    }
  },

  openTraitEditor: function() {
    this.$.traitTable.add();
  },

  openTypeEditor: function() {
    this.$.typeEditor.open();
  },

  _onTypeSaved: function(e) {
    var data = e.detail;
    if (this.editingType) {
      this.editingType = false;
      let i = this.editingTypeIndex;
      this.editingTypeIndex = undefined;
      this.set('types.' + i, data);
      return;
    }
    this.push('types', data);
  },

  _onTypeEdit: function(e) {
    var item = this.$.typesRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.types;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.editingType = true;
    this.editingTypeIndex = index;
    this.$.typeEditor.reset();
    this.$.typeEditor.typeId = item.typeId;
    this.$.typeEditor.displayName = item.displayName;
    this.$.typeEditor.description = item.description;
    this.$.typeEditor.typeProperties = item.typeProperties;
    this.$.typeEditor.baseType = item.baseType;
    this.$.typeEditor.open();
  },

  _onTypeDelete: function(e) {
    var item = this.$.typesRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.types;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('types', index, 1);
  }

});

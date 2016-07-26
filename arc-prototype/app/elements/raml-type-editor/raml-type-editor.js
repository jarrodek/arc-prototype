Polymer({
  is: 'raml-type-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  properties: {
    // id of the trait used in RAML definition
    typeId: String,

    displayName: String,

    description: String,

    // List of object base type properties.
    typeProperties: {
      type: Array,
      value: function() {
        return [];
      }
    },
    /**
     * Internal's editor base type of the Type. It can be either `object` to display
     * object editor or `schema` to display schema (json or XML) editor.
     */
    baseType: {
      type: String,
      value: 'object'
    },

    descInput: {
      type: HTMLElement,
      value: function() {
        return this.$.descInput;
      }
    },

    isDefinedObject: Boolean
  },

  save: function() {
    if (!this.typeId) {
      this.$.typeIdToast.open();
      return;
    }
    if (!this.isDefinedObject) {
      this.$.schemaToast.open();
      return;
    }
    this.fire('type-saved', {
      typeId: this.typeId,
      displayName: this.displayName,
      description: this.description,
      typeProperties: this.typeProperties,
      baseType: this.baseType
    });
    this.opened = false;
  },

  reset: function() {
    this.typeId = '';
    this.displayName = '';
    this.description = '';
    this.typeProperties = [];
    this.baseType = 'object';
  }

});

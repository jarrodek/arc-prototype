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
    }
  }

});

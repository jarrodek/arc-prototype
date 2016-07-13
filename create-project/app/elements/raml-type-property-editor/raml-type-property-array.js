
Polymer({
  is: 'raml-type-property-array',

  properties: {
    // Alle build-in and user-defined types in the RAML file.
    availableTypes: {
      type: Array
    },
    // Indicates the type all items in the array are inherited from.
    // Can be a reference to an existing type or an inline type declaration.
    items: {
      type: Array,
      notify: true
    },
    // Minimum amount of items in array. Value MUST be equal to or greater than 0.
    minItems: {
      type: Number,
      notify: true
    },
    // Maximum amount of items in array. Value MUST be equal to or greater than 0.
    maxItems: {
      type: Number,
      notify: true
    },
    //Boolean value that indicates if items in the array MUST be unique.
    uniqueItems: {
      type: Boolean,
      notify: true
    },
    // Currently selected type in the editor.
    selectedType: String
  },

  _removeType: function(e) {
    var item = this.$.items.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.items;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('items', index, 1);
  },

  _addType: function() {
    var v = this.selectedType;
    var t = this.items;
    if (!v) {
      this.$.selectTypeToast.open();
      return;
    }
    if (!(t && t.length)) {
      t = [];
      this.items = [];
    }
    this.selectedType = null;
    if (t.indexOf(v) !== -1) {
      // Quiletly quit.
      return;
    }
    this.push('items', v);
  }

});

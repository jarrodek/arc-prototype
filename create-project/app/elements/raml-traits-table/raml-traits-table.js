Polymer({
  is: 'raml-traits-table',

  properties: {
    // Delcated in RAML file types.
    declaredTypes: Array,

    // Defined traits.
    traits: {
      type: Array,
      notify: true,
      value: function() {
        return [];
      }
    },

    hidden: {
      type: Boolean,
      value: true,
      reflectToAttribute: true
    }
  },

  observers: [
    '_traitsChanged(traits.length)'
  ],

  // On traits array change check if there's any item in the array and display element if there is.
  _traitsChanged: function(length) {
    var state = !!length;
    this.hidden = !state;
  },
  // Add a new trait
  add: function() {
    this.hidden = false; // required or the editor will be invisible.
    this.$.editor.open();
  },

  // Called when the trait was saved.
  _saved: function(e) {
    var response = e.detail;
    if (this.editing) {
      this.editing = false;
      let i = this.editingIndex;
      this.editingIndex = undefined;
      this.set('traits.' + i, e.detail);
      return;
    }
    this.push('traits', response);
    this.$.editor.opened = false;
  },

  // Called when an array item expected to be edited.
  _edit: function(e) {
    var item = this.$.repeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.traits;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.editing = true;
    this.editingIndex = index;
    this.$.editor.reset();
    this.$.editor.traitName = item.name;
    this.$.editor.description = item.description;
    this.$.editor.usage = item.usage;
    this.$.editor.headers = item.headers;
    this.$.editor.queryParams = item.queryParams;
    this.$.editor.responses = item.responses;
    this.$.editor.requests = item.requests;
    this.$.editor.open();
  },
  // Called when an array item expected to be deleted
  _delete: function(e) {
    var item = this.$.repeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.traits;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('traits', index, 1);
  }
});

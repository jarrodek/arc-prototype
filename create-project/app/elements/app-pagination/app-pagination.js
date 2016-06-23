Polymer({
  is: 'app-pagination',
  properties: {
    /**
     * Number of pages (numbers) to display.
     */
    pages: Number,
    /**
     * Currently selected page.
     */
    selected: Number,
    /**
     * Generated items.
     */
    items: {
      type: Array,
      items: function() {
        return [];
      },
      readOnly: true
    }
  },

  observers: [
    'calculatePages(pages)'
  ],

  calculatePages: function(pages) {
    pages = Number(pages);
    if (pages !== pages) {
      pages = 0;
    }
    var items = [];
    for (var i = 0; i < pages; i++) {
      items.push({
        display: (i + 1)
      });
    }
    this._setItems(items);
  },

  _isSelected: function(index, selected) {
    return index === selected;
  },

  _isEqual: function(a, b) {
    return a === b;
  },

  _computeIsDone: function(index, selected) {
    return selected > index;
  }

});

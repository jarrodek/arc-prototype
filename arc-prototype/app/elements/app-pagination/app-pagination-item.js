Polymer({
  is: 'app-pagination-item',
  properties: {
    // A number to display in this pagination item.
    number: Number,
    // True if the pagination step is done.
    done: {
      type: Boolean,
      value: false
    }
  }
});

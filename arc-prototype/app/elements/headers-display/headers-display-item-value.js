Polymer({
  is: 'headers-display-item-value',

  properties: {
    /**
     * Header value to display
     */
    value: String
  },

  observers: [
    '_valueChanged(value)'
  ],

  _valueChanged: function(value) {
    this.$.display.innerHTML = this.autoLink(this.encodeHtml(value));
  },

  autoLink: function(input) {
    var r = new RegExp('(https?:\\/\\/([^" >]*))', 'gim');
    return input.replace(r, '<a target="_blank" class="auto-link" href="$1">$1</a>');
  },

  encodeHtml: function(input) {
    if (typeof input !== 'string') {
      return input;
    }
    return input.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
});

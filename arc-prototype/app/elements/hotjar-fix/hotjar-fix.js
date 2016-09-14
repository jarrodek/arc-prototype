Polymer({
  is: 'hotjar-fix',
  ready: function() {
    console.log('Running hotjar-fix');
    this.parse();
  },

  parse: function() {
    var elms = document.querySelectorAll('no-script');
    if (!elms || !elms.length) {
      return;
    }
    elms.forEach(function(item) {
      var src = item.getAttribute('src');
      var s = document.createElement('script');
      s.src = src;
      item.parentNode.insertBefore(s, item);
      item.parentNode.removeChild(item);
    });
  }
});

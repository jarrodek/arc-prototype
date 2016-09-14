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
    console.log('hotjar-fix::parse', elms);
  }
});

Polymer({
  is: 'raml-quick-auth',

  properties: {
    authorizing: {
      type: Boolean,
      notify: true
    },

    authorized: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  authorize: function() {
    this.authorizing = true;
    this.async(() => {
      this.authorizing = false;
      this.authorized = true;
    }, 2500);
  },

  _help: function() {
    this.$.help.open();
  }
});

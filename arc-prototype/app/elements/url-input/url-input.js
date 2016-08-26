Polymer({
  is: 'url-input',

  properties: {
    /**
     * Entered by the user query. It can be either an URL or search query.
     */
    url: {
      type: String,
      notify: true
    }
  }
});

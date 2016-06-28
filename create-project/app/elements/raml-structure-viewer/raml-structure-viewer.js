Polymer({
  is: 'raml-structure-viewer',
  properties: {
    endpoints: Array
  },

  _computeEndpointDisplayName: function(endpoint) {
    return endpoint.displayName || endpoint.url;
  },

  _computeEndpointItemClass: function(opened) {
    return opened ? 'opened' : '';
  },

  toggle: function(e) {
    var model = this.$.repeater.modelForElement(e.target);
    var opened = model.get('item.opened');
    opened = !opened;
    model.set('item.opened', opened);
  },
});

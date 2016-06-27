Polymer({
  is: 'api-tree-table',

  properties: {
    endpoints: Array
  },

  _computeEndpointDisplayName: function(endpoint) {
    return endpoint.displayName || endpoint.url;
  },

  _computeEndpointUrlName: function(endpoint) {
    return endpoint.url;
  },

  toggle: function(e) {
    var model = this.$.repeater.modelForElement(e.target);
    var opened = model.get('item.opened');
    opened = !opened;
    model.set('item.opened', opened);
  },

  _computeendpointItemClass: function(opened) {
    return opened ? 'opened' : '';
  }
});

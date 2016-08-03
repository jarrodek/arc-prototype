Polymer({
  is: 'raml-endpoints-tree',

  properties: {
    endpoints: Array
  },

  // listeners: {
  //   'method-selected': '_onMethodSelected'
  // },

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

  _onMethodSelected: function(e) {
    var detail = e.detail;
    var index = this.$.repeater.indexForElement(e.target);
    if (detail.path.startsWith('endpoints')) {
      detail.path = 'endpoints.' + index + '.' + detail.path;
    } else {
      detail.path = 'endpoints.' + index + '.methods.' + detail.path;
    }

    // console.log('_onMethodSelected', detail);
  },

  _fireSelection: function(e) {
    var index = this.$.repeater.indexForElement(e.target);
    var path = 'endpoints.' + index;
    this.fire('endpoint-selected', {
      path: path,
      endpoint: this.endpoints[index]
    });
  },

  _onEndpointSelected: function(e) {
    var detail = e.detail;
    var index = this.$.repeater.indexForElement(e.target);
    detail.path = 'endpoints.' + index + '.' + detail.path;
  }

});

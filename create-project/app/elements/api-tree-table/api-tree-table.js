'use strict';

Polymer({
  is: 'api-tree-table',

  properties: {
    endpoints: Array,
    selected: {
      type: Object,
      notify: true
    }
  },

  listeners: {
    'tap': '_elementClicked'
  },

  observers: [
    '_selectedChanged(selected)'
  ],

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
  },

  _elementClicked: function(e) {
    e = Polymer.dom(e);
    var path = e.path;
    var refElm = null;
    for (let i = 0, len = path.length; i < len; i++) {
      let item = path[i];
      if (item.hasAttribute && item.hasAttribute('endpoint')) {
        refElm = item;
        break;
      } else if (item.nodeName === 'API-TREE-METHODS') {
        refElm = item;
        break;
      }
    }
    if (!refElm) {
      return;
    }

    this._clearSelected();

    var model = this.$.repeater.modelForElement(refElm);
    model.set('item.selected', true);
    this.set('selected', model.get('item'));
  },

  _selectedChanged: function(selected) {
    if (!selected) {
      this._clearSelected();
    }
  },

  _clearSelected: function() {
    var selected = this.$$('paper-item[selected]');
    if (selected) {
      let model = this.$.repeater.modelForElement(selected);
      if (model) {
        model.set('item.selected', false);
      }
      selected.removeAttribute('selected');
    }
  }
});

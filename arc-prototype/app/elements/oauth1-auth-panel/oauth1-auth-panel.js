Polymer({
  is: 'oauth1-auth-panel',

  _activateHint: function(e) {
    var field = this.__getHintField(e);
    if (!field) {
      return;
    }
    field.setAttribute('active', true);
  },

  _deactivateHint: function(e) {
    var field = this.__getHintField(e);
    if (!field) {
      return;
    }
    field.removeAttribute('active');
  },

  __getHintField: function(e) {
    var set = e.target.dataset;
    if (!('field' in set)) {
      return;
    }
    var field = set.field;
    return Polymer.dom(this.root).querySelector('.hint[field="' + field + '"]');
  },
});

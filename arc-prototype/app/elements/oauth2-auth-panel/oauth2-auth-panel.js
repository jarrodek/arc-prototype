Polymer({
  is: 'oauth2-auth-panel',

  behaviors: [ArcBehaviors.AuthPanelBehavior],

  properties: {
    grantType: {
      type: String,
      value: ''
    }
  },

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

  _isFieldHidden: function() {
    var args = Array.from(arguments);
    var grantType = args.splice(0, 1)[0];

    return args.indexOf(grantType) === -1;
  },

  authorize: function() {
    this.mockAuthorize();
  }

});

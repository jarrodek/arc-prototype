/* global RamlBehaviors */
Polymer({
  is: 'raml-type-property-string',

  behaviors: [RamlBehaviors.RamlTypePropertyBehavior],

  properties: {
    // Maximum length of the string. Value MUST be equal to or greater than 0.
    maxLength: Number,
    // Minimum length of the string. Value MUST be equal to or greater than 0.
    minLength: Number,
    // Regular expression that this string should match.
    pattern: Number
  },

  ready: function() {
    if (!this.name) {
      this.$.collapse.show();
    }
  },

  toggle: function() {
    this.$.collapse.toggle();
  },

  _computeIcon: function(opened) {
    return opened ? 'arc:expand-less' : 'arc:expand-more';
  },

  cancel: function() {
    this.$.collapse.hide();
  },

  delete: function() {
    this.fire('delete-property');
  }
});

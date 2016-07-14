/* global RamlBehaviors */

Polymer({
  is: 'raml-type-property-editor',

  behaviors: [RamlBehaviors.RamlTypePropertyBehavior],

  properties: {
    opened: Boolean
  },

  observers: [
    '_openedChanged(opened)'
  ],

  _openedChanged: function(opened) {
    if (opened) {
      // take a snapshot of current property state.
      // When the user cancel edit it will restore property values.
      this._snapshot = Object.assign({}, this.property);
    } else {
      this._snapshot = null;
    }
  },

  ready: function() {
    if (!this.property.name) {
      this.$.collapse.show();
    }
  },

  toggle: function() {
    this.$.collapse.toggle();
  },

  open: function() {
    this.$.collapse.opened = true;
  },

  _computeIcon: function(opened) {
    return opened ? 'arc:expand-less' : 'arc:expand-more';
  },

  cancel: function() {
    this.set('property', this._snapshot);
    this.$.collapse.hide();
  },

  delete: function() {
    this.fire('delete-property');
    this.$.collapse.hide();
  },

  save: function() {
    this.fire('save-property', {
      property: this.property
    });
    this.$.collapse.hide();
  },

  _computeShowDateTime: function(isDateOnly, isTimeOnly, isDateTimeOnly, isDateTime) {
    return isDateOnly || isTimeOnly || isDateTimeOnly || isDateTime;
  }

});

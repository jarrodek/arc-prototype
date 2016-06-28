Polymer({
  is: 'raml-headers-table',

  properties: {
    name: {
      type: String,
      value: ''
    },
    description: {
      type: String,
      value: ''
    },
    // The type of the header.
    dataType: {
      type: String,
      value: 'string'
    },
    example: {
      type: String,
      value: ''
    },
    pattern: {
      type: String,
      value: ''
    },
    required: {
      type: Boolean,
      value: false
    },
    validation: Boolean,

    availableTypes: {
      type: Array,
      value: function() {
        return [
          'string', 'number', 'array'
        ];
      }
    }
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

  save: function() {
    var name = this.name;
    if (!name) {
      return;
    }
    this.fire('save', {
      name: this.name,
      description: this.description,
      type: this.dataType,
      example: this.example,
      pattern: this.pattern,
      required: this.required
    });
    this.$.collapse.hide();
  },

  cancel: function() {
    this.$.collapse.hide();
  },

  delete: function() {
    this.fire('delete');
  }

});

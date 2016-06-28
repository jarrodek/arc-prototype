Polymer({
  is: 'raml-query-params-table',

  properties: {
    name: {
      type: String,
      value: ''
    },
    description: {
      type: String,
      value: ''
    },
    type: {
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
          'string', 'number', 'array', 'enum'
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
    this.fire('save-query-param', {
      name: this.name,
      description: this.description,
      type: this.type,
      example: this.example,
      pattern: this.pattern,
      required: this.required
    });
    this.$.collapse.hide();
  },

  cancel: function() {
    this.$.collapse.hide();
    this.fire('cancel-query-param');
  },

  delete: function() {
    this.fire('delete-query-param');
  }

});

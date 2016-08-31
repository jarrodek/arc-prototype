Polymer({
  is: 'raml-documentation-tree',

  properties: {
    documentation: Array,
    endpoints: Array,

    showDocs: {
      type: Boolean,
      readOnly: true,
      value: false
    },
    showEndpoints: {
      type: Boolean,
      readOnly: true,
      value: false
    },

    selectedDocs: Number,

    selected: {
      type: Object,
      value: {
        'type': undefined,
        'path': undefined,
        'object': undefined
      },
      notify: true
    }
  },

  observers: [
    '_computeDocs(documentation.*)',
    '_computeEndpoints(endpoints.*)',
    '_selectedDocsChanged(selectedDocs)',
  ],

  _computeDocs: function() {
    var d = this.documentation;
    var has = d && d.length > 0;
    this._setShowDocs(has);
    this.selectedDocs = 0;
  },

  _computeEndpoints: function() {
    var e = this.endpoints;
    var has = e && e.length > 0;
    this._setShowEndpoints(has);
  },

  _selectedDocsChanged: function(index) {
    if (!this.documentation || !(index in this.documentation)) {
      return;
    }
    this.set('selected', {
      type: 'docs',
      path: '' + index,
      object: this.documentation[index]
    });
  },

  _onMethodSelected: function(e) {
    var d = e.detail;
    this.selectedDocs = -1;
    this.set('selected', {
      type: 'method',
      path: d.path,
      object: d.method
    });
  },

  _onEndpointSelected: function(e) {
    var d = e.detail;
    this.selectedDocs = -1;
    this.set('selected', {
      type: 'endpoint',
      path: d.path,
      object: d.endpoint
    });
  },

});

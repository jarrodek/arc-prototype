Polymer({
  is: 'payload-editor',

  properties: {
    tabSelected: {
      type: Number,
      value: 0
    },
    /**
     * If set the editor will add autofill support and schema validation.
     * Each schema object contains content-type definition so it can choose schema depending on
     * current state.
     */
    schemas: Array,
    activeSchema: {
      type: Object,
      readOnly: true
    },
    jsonPayload: {
      type: Object,
      value: function() {
        return {
          'string': 'aaaaaa',
          'integer': 2345,
          'float': 2345.67,
          'boolean': true,
          'nullable': null,
          'arrable': [
            'one', 'two', 3
          ],
          'objectable': {
            'inner': 'child',
            'inner2': 'child',
            'incepcion': {
              'aaaa': 1234
            }
          }
        };
      }
    },
    value: String,
    // Current content type selected by the user.
    contentType: {
      type: String,
      notify: true
    }
  },

  observers: [
    '_generateValue(jsonPayload.*)',
    '_tabChanged(tabSelected)',
    '_schameChanged(schemas.*, contentType)',
    '_valueChanged(value)'
  ],

  _generateValue: function() {
    this.internalValueSet = true;
    this.set('value', JSON.stringify(this.jsonPayload, null, 2));
    this.internalValueSet = false;
  },

  _valueChanged: function(v) {
    if (this.internalValueSet) {
      return;
    }
    // console.log('_valueChanged', v);
    try {
      this.jsonPayload = JSON.parse(v);
    } catch (e) {
      console.warn('The JSON value seems to be invalid.');
    }
  },

  _tabChanged: function(tabSelected) {
    switch (tabSelected) {
      case 1: this.$.cm.editor.refresh(); break;
    }
  },

  _schameChanged: function(record, contentType) {
    var s = this.schemas;
    if (!contentType || !s || !s.length) {
      this.activeSchema = undefined;
      return;
    }
    var filtered = s.filter((item) => item.contentType === contentType);
    var as = (filtered && filtered.length > 0) ? filtered[0].json : undefined;
    this._setActiveSchema(as);
  }
});

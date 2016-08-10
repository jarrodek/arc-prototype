Polymer({
  is: 'payload-editor',

  properties: {
    tabSelected: {
      type: Number,
      value: 0
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
    value: String
  },

  observers: [
    '_generateValue(jsonPayload.*)',
    '_tabChanged(tabSelected)'
  ],

  _generateValue: function() {
    this.set('value', JSON.stringify(this.jsonPayload, null, 2));
  },

  _tabChanged: function(tabSelected) {
    switch (tabSelected) {
      case 1: this.$.cm.editor.refresh(); break;
    }
  }
});

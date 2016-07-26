Polymer({
  is: 'payload-editor',

  properties: {
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
            'inner': 'child'
          }
        };
      }
    }
  }
});

Polymer({
  is: 'raml-responses-panel-view',
  properties: {
    responses: Array,
    hasResponses: Boolean,
    selectedResource: {
      type: Number,
      value: 0
    }
  },

  observers: [
    '_responsesChanged(responses.*)'
  ],

  _responsesChanged: function() {
    console.log('responsesChanged', this.responses);
    var d = this.responses;
    var has = d && !!d.length;
    this.hasResponses = has;
  },

  _hasProperty: function(obj, property) {
    return property in obj;
  },

  _computeCodeClass: function(code) {
    code = Number(code);
    if (code !== code) {
      return '';
    }
    if (code >= 200 && code < 300) {
      return 'green';
    }
    if (code >= 300 && code < 400) {
      return 'blue';
    }
    if (code >= 400 && code < 500) {
      return 'orange';
    }
    if (code >= 500 && code < 600) {
      return 'red';
    }
  }
});

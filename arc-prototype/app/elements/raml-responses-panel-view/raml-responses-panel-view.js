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
  }
});

Polymer({
  is: 'raml-responses-table',
  behaviors: [window.RamlBehaviors.RamlTypeBehavior],
  properties: {
    responses: {
      type: Array,
      notify: true,
      value: function() {
        return [];
      }
    },
    hidden: {
      type: Boolean,
      reflectToAttribute: true
    }
  },

  observers: [
    '_responsesChanged(responses.length)'
  ],

  _responsesChanged: function(length) {
    var state = !!length;
    this.hidden = !state;
  },

  _responseDeleted: function(e) {
    var item = this.$.responsesRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.responses;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.splice('responses', index, 1);
  },

  _responseEdit: function(e) {
    var item = this.$.responsesRepeater.itemForElement(e.target);
    if (!item) {
      return;
    }
    var all = this.responses;
    var index = all.indexOf(item);
    if (index === -1) {
      return;
    }
    this.editingResponse = true;
    this.editingResponseIndex = index;
    this.$.responseEditor.reset();
    this.$.responseEditor.statusCode = item.statusCode;
    this.$.responseEditor.contentType = item.contentType;
    this.$.responseEditor.headers = item.headers;
    var b = item.body;
    if (typeof b === 'string') {
      this.$.responseEditor.selectedType = b;
    } else if (b) {
      this.$.responseEditor.type = b;
      this.$.responseEditor.bodySelectorPage = 1;
    }
    this.$.responseEditor.description = item.description;
    this.$.responseEditor.open();
  },

  add: function() {
    this.hidden = false;
    this.$.responseEditor.open();
  },

  _responseSaved: function(e) {
    var response = e.detail;
    if (this.editingResponse) {
      this.editingResponse = false;
      let i = this.editingResponseIndex;
      this.editingResponseIndex = undefined;
      this.set('responses.' + i, e.detail);
      return;
    }
    this.push('responses', response);
  }

});

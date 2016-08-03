Polymer({
  is: 'raml-documentation-panel',

  properties: {
    // The RAML definition data
    data: {
      type: Object,
      value: function() {
        return {};
      },
      notify: true
    },

    selectedObject: Object,
    selectedRenderer: String,
  },

  observers: [
    '_docChanged(selectedObject.*)'
  ],

  _docChanged: function() {
    var doc = this.selectedObject;
    this.selectedRenderer = doc.type;
  },

  isRenderer: function(selected, type) {
    return selected === type;
  },

  _computeParentEndpoint: function(path) {
    if (!path || typeof path !== 'string') {
      return undefined;
    }
    var list = path.split('.');
    var current = this.data;
    for (let i = 0, len = list.length; i < len; i++) {
      let segment = list[i];
      if (segment === 'endpoints') {
        current = current.endpoints;
        continue;
      } else if (segment === 'methods') {
        // current = current.methods;
        // That's it! Current is the parent endpoint.
        break;
      } else {
        let n = Number(segment);
        if (n !== n) {
          console.info('Unknown segment ' + segment + ' in path ' + path);
          return undefined;
        }
        current = current[n];
      }
    }
    return current;
  }
});

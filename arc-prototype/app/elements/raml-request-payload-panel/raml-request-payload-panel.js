Polymer({
  is: 'raml-request-payload-panel',

  properties: {
    bodies: Array,
    schemas: Array,
    value: {
      type: String,
      value: '{}'
    },
    contentType: {
      type: String,
      notify: true
    }
  },

  observers: [
    '_bodiesChanged(bodies.*)'
  ],

  _bodiesChanged: function() {
    var b = this.bodies;
    if (!b) {
      this.schemas = undefined;
      return;
    }
    var schemas = [];
    if (b instanceof Array) {
      b.forEach((def) => {
        schemas.push({
          'contentType': def.contentType,
          'json': this._translateTypeSchema(def)
        });
      });
    } else {
      schemas.push({
        'contentType': b.contentType,
        'json': this._translateTypeSchema(b)
      });
    }
    this.schemas = schemas;
  },

  _translateTypeSchema: function(type) {
    var schema = {
      'title': type.displayName || type.typeId,
      'type': 'object',
      'properties': {},
      'required': []
    };

    type.typeProperties.forEach((prop) =>
      schema.properties[prop.name] = this._translateProperty(prop));

    for (let prop in schema.properties) {
      if (schema.properties[prop].required) {
        schema.required.push(prop);
      }
    }

    if (type.description) {
      schema.description = type.description;
    }
    return schema;
  },

  _translateProperty: function(prop) {
    let desc = {
      'type': prop.type
    };
    if (prop.description) {
      desc.description = prop.description;
    }
    if (prop.example) {
      desc.example = prop.example;
    }
    if (prop.required) {
      desc.required = prop.required;
    }
    if (prop.pattern) {
      desc.pattern = prop.pattern;
    }
    if (prop.type === 'object') {
      desc.properties = {};
      desc.required = [];
      prop.typeProperties.forEach((_prop) =>
        desc.properties[_prop.name] = this._translateProperty(_prop));

      for (let prop in desc.properties) {
        if (desc.properties[prop].required) {
          desc.required.push(prop);
        }
      }
    }
    return desc;
  }
});

Polymer({
  is: 'raml-documentation-panel',

  properties: {
    // The RAML definition data
    data: {
      type: Object,
      value: function() {
        return {};
      },
      notify: true,
      // Reference to the 'noTryit' property for `raml-method-documentation-viewer` element
      noTryit: Boolean
    },

    selectedObject: Object,
    selectedRenderer: String,
    parentEndpoint: Object,

    _pathList: Array,

    // Traits used in selected endpoint / method
    traits: Array,
    // Security schemas used in selected endpoint / method
    securitySchemas: Array,
    // Uri paramteres used in selected endpoint / method
    uriParameters: Array,
    // types: Array,
    // Query parametres used in selected endpoint / method
    queryParams: Array,
    // Headers used in selected endpoint / method
    headers: Array,
    // Request bodies used in selected endpoint / method
    bodies: Array,
    // Responses used in selected endpoint / method
    responses: Array
  },

  observers: [
    '_docChanged(selectedObject.*)',
    '_splitPath(selectedObject.path)',
    '_computeParts(_pathList.*, data.*)',
  ],

  _splitPath: function(path) {
    var list = [];
    if (!(!path || typeof path !== 'string')) {
      list = path.split('.');
    }

    this.set('_pathList', list);
  },

  // Gets all traits scanning from the the top to this method / endpoint
  _computeParts: function() {
    var list = this._pathList;
    if (!list || !list.length) {
      this.traits = [];
      this.securitySchemas = [];
      this.uriParameters = [];
      this.queryParams = [];
      this.headers = [];
      this.bodies = [];
      this.responses = [];
      return;
    }
    var traits = [];
    var securitySchemas = [];
    var uriParameters = [];
    var queryParams = [];
    var headers = [];
    var bodies = [];
    var responses = [];
    var current = this.data;
    for (let i = 0, len = list.length; i < len; i++) {
      let segment = list[i];
      if (segment === 'endpoints') {
        // Entering endpoints array
        current = current.endpoints;
        continue;
      } else if (segment === 'methods') {
        current = current.methods;
        // Entering methods array
        continue;
      }

      let n = Number(segment);
      if (n !== n) {
        console.warn('Unknown segment ' + segment + ' in path ' + list.join('.'));
        this.traits = [];
        this.securitySchemas = [];
        this.uriParameters = [];
        this.queryParams = [];
        this.headers = [];
        this.bodies = [];
        this.responses = [];
        return;
      }
      current = current[n];
      if (!current) {
        continue;
      }
      // look for traits
      if (current.is && current.is.length) {
        for (let j = 0, len = current.is.length; j < len; j++) {
          let t = this._findTrait(current.is[j]);
          if (t) {
            traits[traits.length] = t;
          }
        }
      }
      // look for security schemas
      if (current.securedBy && current.securedBy.length) {
        for (let j = 0, len = current.securedBy.length; j < len; j++) {
          let s = this._findSecurityScheme(current.securedBy[j]);
          if (s) {
            securitySchemas[securitySchemas.length] = s;
          }
        }
      }
      // look for params
      if (current.uriParameters && current.uriParameters.length) {
        uriParameters = uriParameters.concat(current.uriParameters);
      }

      // Look for query parameters in endpoints and traits
      let qp = this.__getQueryParams(current);
      if (qp && qp.length) {
        queryParams = queryParams.concat(qp);
      }

      // Look for headers in endpoints and traits
      let hd = this.__getHeaders(current);
      if (hd && hd.length) {
        headers = headers.concat(hd);
      }

      // Look for bodies in endpoints and traits
      let bd = this.__getBodies(current);
      if (bd && bd.length) {
        bodies = bodies.concat(bd);
      }

      let rb = this.__getResponses(current);
      if (rb && rb.length) {
        responses = bodies.concat(rb);
      }
    }

    this.traits = traits;
    this.securitySchemas = securitySchemas;
    this.uriParameters = uriParameters;
    this.queryParams = queryParams;
    this.headers = headers;
    this.bodies = bodies;
    this.responses = responses;
  },

  _findTrait: function(name) {
    var d = this.data;
    if (!d || !d.traits || !d.traits.length) {
      return null;
    }
    var t = d.traits;
    for (let i = 0, len = t.length; i < len; i++) {
      if (t[i].name === name) {
        return t[i];
      }
    }
    return null;
  },

  _findSecurityScheme: function(id) {
    var d = this.data;
    if (!d || !d.securitySchemas || !d.securitySchemas.length) {
      return null;
    }
    var s = d.securitySchemas;
    for (let i = 0, len = s.length; i < len; i++) {
      if (s[i].id === id) {
        return s[i];
      }
    }
    return null;
  },

  __getQueryParams: function(current) {
    var params = [];
    if (current.queryParams && current.queryParams.length) {
      params = params.concat(current.queryParams);
    }

    if (current.is && current.is.length) {
      for (let i = 0, len = current.is.length; i < len; i++) {
        let t = this._findTrait(current.is[i]);
        if (!t || !t.queryParams || !t.queryParams.length) {
          continue;
        }
        params = params.concat(t.queryParams);
      }
    }

    if (current.securedBy && current.securedBy.length) {
      for (let i = 0, len = current.securedBy.length; i < len; i++) {
        let s = this._findSecurityScheme(current.securedBy[i]);
        if (!s || !s.queryParams || !s.queryParams.length) {
          continue;
        }
        params = params.concat(s.queryParams);
      }
    }

    return params;
  },

  __getHeaders: function(current) {
    var params = [];
    if (current.headers && current.headers.length) {
      params = params.concat(current.headers);
    }
    if (current.is && current.is.length) {
      for (let i = 0, len = current.is.length; i < len; i++) {
        let t = this._findTrait(current.is[i]);
        if (!t || !t.headers || !t.headers.length) {
          continue;
        }
        params = params.concat(t.headers);
      }
    }
    if (current.securedBy && current.securedBy.length) {
      for (let i = 0, len = current.securedBy.length; i < len; i++) {
        let s = this._findSecurityScheme(current.securedBy[i]);
        if (!s || !s.headers || !s.headers.length) {
          continue;
        }
        params = params.concat(s.headers);
      }
    }
    return params;
  },

  __getBodies: function(current) {
    var params = [];
    if (current.body && current.body.length) {
      params = params.concat(current.body);
    }
    if (current.is && current.is.length) {
      for (let i = 0, len = current.is.length; i < len; i++) {
        let t = this._findTrait(current.is[i]);
        if (!t || !t.body || !t.body.length) {
          continue;
        }
        params = params.concat(t.body);
      }
    }
    if (current.securedBy && current.securedBy.length) {
      for (let i = 0, len = current.securedBy.length; i < len; i++) {
        let s = this._findSecurityScheme(current.securedBy[i]);
        if (!s || !s.body || !s.body.length) {
          continue;
        }
        params = params.concat(s.body);
      }
    }
    this._extractTypes(params);
    return params;
  },

  __getResponses: function(current) {
    var params = [];
    if (current.responses && current.responses.length) {
      params = params.concat(current.responses);
    }
    if (current.is && current.is.length) {
      for (let i = 0, len = current.is.length; i < len; i++) {
        let t = this._findTrait(current.is[i]);
        if (!t || !t.responses || !t.responses.length) {
          continue;
        }
        params = params.concat(t.responses);
      }
    }
    if (current.securedBy && current.securedBy.length) {
      for (let i = 0, len = current.securedBy.length; i < len; i++) {
        let s = this._findSecurityScheme(current.securedBy[i]);
        if (!s || !s.responses || !s.responses.length) {
          continue;
        }
        params = params.concat(s.responses);
      }
    }
    this._extractTypes(params, 'body');
    return params;
  },

  _extractTypes: function(params, property) {
    var baseTypes = ['object', 'array','integer', 'string','number','boolean','datetime','file',
      'null','any'];
    var t = this.data.types;
    if (t && t.length) {
      let len = t.length;
      params.forEach((param) => {
        let _propertyParam = property ? param[property] : param;
        if (!_propertyParam) {
          return;
        }
        let baseType = null;
        if (typeof _propertyParam === 'string') {
          baseType = _propertyParam;
          _propertyParam = {};
          _propertyParam.baseType = baseType;
        } else {
          baseType = _propertyParam.baseType;
        }
        if (baseTypes.indexOf(baseType) === -1) {
          for (var i = 0; i < len; i++) {
            if (t[i].typeId === baseType) {
              let _param = Object.assign(_propertyParam, t[i]);
              _param.baseType = baseType;
              if (property) {
                param[property] = _param;
              } else {
                param = _param;
              }
              return;
            }
          }
        }
      });
    }
  },

  _docChanged: function() {
    var doc = this.selectedObject;
    this.selectedRenderer = doc.type;
    if (doc.type === 'method') {
      this.parentEndpoint = this._computeParentEndpoint(doc.path);
    } else {
      this.parentEndpoint = undefined;
    }
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
  },

  _methodSelected: function(e) {
    var d = e.detail;
    var s = this.selectedObject;
    this.set('selectedObject', {
      type: 'method',
      path: s.path + '.methods.' + d.path,
      object: d.method
    });
  }
});

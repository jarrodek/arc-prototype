Polymer({
  is: 'raml-method-documentation-viewer',

  properties: {
    data: Object,
    method: Object,
    parentEndpoint: Object,
    parentEndpointName: String,
    hasParentEndpointName: String,
    baseUrl: String,
    path: String,
    _pathList: Array,

    hasParameters: Boolean,

    uriParameters: Array,
    hasUriParameteres: Boolean,

    queryParameters: Array,
    hasQueryParameteres: Boolean,

    headers: Array,
    hasHeaders: Boolean,

    bodies: Array,
    hasBodies: Boolean
  },

  observers: [
    '_parentEndpointChanged(parentEndpoint.*)',
    '_splitPath(path)',
    '_computeUriParameters(_pathList.*, data.*)',
    '_computeQueryParameters(_pathList.*, data.*)',
    '_computeHasParameters(uriParameters.*, queryParameters.*)',
    '_computeHeaders(_pathList.*, data.*)',
    '_computeBodies(_pathList.*, data.*)',
  ],

  _parentEndpointChanged: function() {
    var e = this.parentEndpoint;
    if (!e) {
      this.parentEndpointName = undefined;
      this.hasParentEndpointName = false;
      return;
    }

    this.parentEndpointName = e.displayName || e.url;
    this.hasParentEndpointName = true;
  },

  _computeMethodName: function() {
    var m = this.method;
    return m.displayName || m.method;
  },

  _computeHideMethodDesc(description) {
    return !description;
  },

  _computeUrl: function(base, path) {
    return base + path;
  },

  _splitPath: function(path) {
    var list = [];
    if (!(!path || typeof path !== 'string')) {
      list = path.split('.');
    }

    this.set('_pathList', list);
  },

  _computeHasParameters: function() {
    var a = this.uriParameters;
    var b = this.queryParameters;
    var res = (a && a.length) || (b && b.length);
    this.hasParameters = res;
  },

  _computeUriParameters: function() {
    var list = this._pathList;
    if (!list || !list.length) {
      this.uriParameters = [];
      this.hasUriParameteres = false;
      return;
    }
    var params = [];
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
          console.info('Unknown segment ' + segment + ' in path ' + list.join('.'));
          return undefined;
        }
        current = current[n];
        if (!current) {
          continue;
        }
        // look for params
        if (!current.uriParameters || !current.uriParameters.length) {
          continue;
        }
        params = params.concat(current.uriParameters);
      }
    }
    this.uriParameters = params;
    this.hasUriParameteres = !!params.length;
  },

  _computeQueryParameters: function() {
    var list = this._pathList;
    if (!list || !list.length) {
      this.queryParameters = [];
      this.hasQueryParameteres = false;
      return;
    }
    var params = [];
    var current = this.data;
    for (let i = 0, len = list.length; i < len; i++) {
      let segment = list[i];
      if (segment === 'endpoints') {
        // Entering endpoints array
        current = current.endpoints;
        continue;
      } else if (segment === 'methods') {
        current = current.methods;
        continue;
      } else {
        let n = Number(segment);
        if (n !== n) {
          console.info('Unknown segment ' + segment + ' in path ' + list.join('.'));
          return undefined;
        }
        current = current[n];
        if (!current) {
          continue;
        }
        // Look for query parameters in endpoints and traits

        let qp = this.__getQueryParams(current);
        if (qp && qp.length) {
          params = params.concat(qp);
        }
      }
    }
    this.queryParameters = params;
    this.hasQueryParameteres = !!params.length;
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

  _computeHeaders: function() {
    var list = this._pathList;
    if (!list || !list.length) {
      this.headers = [];
      this.hasHeaders = false;
      return;
    }
    var params = [];
    var current = this.data;
    for (let i = 0, len = list.length; i < len; i++) {
      let segment = list[i];
      if (segment === 'endpoints') {
        // Entering endpoints array
        current = current.endpoints;
        continue;
      } else if (segment === 'methods') {
        current = current.methods;
        continue;
      } else {
        let n = Number(segment);
        if (n !== n) {
          console.info('Unknown segment ' + segment + ' in path ' + list.join('.'));
          return undefined;
        }
        current = current[n];
        if (!current) {
          continue;
        }
        // Look for query parameters in endpoints and traits

        let data = this.__getHeaders(current);
        if (data && data.length) {
          params = params.concat(data);
        }
      }
    }
    this.headers = params;
    this.hasHeaders = !!params.length;
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

  _computeBodies: function() {
    var list = this._pathList;
    if (!list || !list.length) {
      this.bodies = [];
      this.hasBodies = false;
      return;
    }
    var params = [];
    var current = this.data;
    for (let i = 0, len = list.length; i < len; i++) {
      let segment = list[i];
      if (segment === 'endpoints') {
        // Entering endpoints array
        current = current.endpoints;
        continue;
      } else if (segment === 'methods') {
        current = current.methods;
        continue;
      } else {
        let n = Number(segment);
        if (n !== n) {
          console.info('Unknown segment ' + segment + ' in path ' + list.join('.'));
          return undefined;
        }
        current = current[n];
        if (!current) {
          continue;
        }
        // Look for query parameters in endpoints and traits

        let data = this.__getBodies(current);
        if (data && data.length) {
          params = params.concat(data);
        }
      }
    }
    this.bodies = params;
    this.hasBodies = !!params.length;
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
    return params;
  },
});

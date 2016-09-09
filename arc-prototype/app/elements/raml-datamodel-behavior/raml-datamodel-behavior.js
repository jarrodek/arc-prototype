(function() {
'use strict';
/**
@license
Copyright 2016 Pawel Psztyc, The ARC team
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
window.RamlBehaviors = window.RamlBehaviors || {};

/**
 * Common behavior for RAML data model.
 *
 * # Usage
 * As soon as the `path` is set the change is propagated and all attributes are computed from
 * the RAML definition (the `data` attribute).
 *
 * If the element do not use `path` attribute it can call `setPath(path)` function manually
 * to compute the data.
 *
 * The `path` is a part of the `method-selected` and `endpoint-selected` events fired by
 * `<raml-endpoints-tree>`.
 *
 * @polymerBehavior RamlBehaviors.RamlDataModelBehavior
 */
RamlBehaviors.RamlDataModelBehavior = {
  properties: {
    // The RAML definition data
    data: {
      type: Object,
      value: function() {
        return {};
      },
      notify: true
    },
    // Selected by the user path. The path is a part of the method / endpoint selection event.
    path: String,
    /**
     * A list of parsed path elements. Path is always added to the endpoint / method
     * selection events.
     * So the `endpoints.0.method.1` becomes: ['endpoints', 0, 'method', 1] which instructs the
     * behavior to look for a definition in first endpoint in the `data` property and then in
     * sencod method. Then it will walk through the RAML definition to look for traits, types,
     * securit schemes etc that should be applied to the method / endpoint.
     */
    pathList: Array,
    // Traits used in selected endpoint / method
    traits: {
      type: Array,
      notify: true
    },
    // Security schemas used in selected endpoint / method
    securitySchemas: {
      type: Array,
      notify: true
    },
    // Uri paramteres used in selected endpoint / method
    uriParameters: {
      type: Array,
      notify: true
    },
    // types: Array,
    // Query parametres used in selected endpoint / method
    queryParams: {
      type: Array,
      notify: true
    },
    // Headers used in selected endpoint / method
    headers: {
      type: Array,
      notify: true
    },
    // Request bodies used in selected endpoint / method
    bodies: {
      type: Array,
      notify: true
    },
    // Responses used in selected endpoint / method
    responses: {
      type: Array,
      notify: true
    },
    // A parent endpoint for selected method.
    parentEndpoint: {
      type: Object,
      notify: true
    },
    // Computed URL for selected endpoint.
    url: {
      type: String,
      notify: true,
      readOnly: true
    }
  },

  observers: [
    'setPath(path)',
    '_computeParts(pathList.*, data.*)',
    '_computeParentEndpoint(pathList.*, data.*)',
    '_computeUrl(data.baseUrl, parentEndpoint.fullUrl)'
  ],

  /**
   * Set's the `pathList` property from the `path` string passed as an argument.
   * It will be called automatically if the `path` attribute is set. However it can be called
   * manually if the element does not use it.
   *
   * @param {String} path The path from the method / endpoint selection event.
   */
  setPath: function(path) {
    var list = [];
    if (!(!path || typeof path !== 'string')) {
      list = path.split('.');
    }
    this.set('pathList', list);
  },

  /**
   * Computes all types, traits, security schemes etc for selected path.
   * It sets all RAML data in the corresponing attributes.
   */
  _computeParts: function() {
    var list = this.pathList;
    var current = this.data;
    if (!list || !list.length || !current) {
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
      // If it's not an endpoint or method keywork then it must be a number.
      let n = Number(segment);
      if (n !== n) {
        console.warn('Unknown segment ' + segment + ' in path ' + list.join('.'));
        break;
        // this.traits = [];
        // this.securitySchemas = [];
        // this.uriParameters = [];
        // this.queryParams = [];
        // this.headers = [];
        // this.bodies = [];
        // this.responses = [];
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
        responses = responses.concat(rb);
      }
    }

    var data = this.data;
    if (data.uriParameters && data.uriParameters.length) {
      uriParameters = uriParameters.concat(data.uriParameters);
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

  _computeParentEndpoint: function() {
    var list = this.pathList;
    var current = this.data;
    if (!list || !list.length || !current) {
      this.parentEndpoint = undefined;
      return;
    }
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
          console.info('Unknown segment ' + segment + ' in path ' + this.path);
          this.parentEndpoint = undefined;
          return;
        }
        current = current[n];
      }
    }

    this.parentEndpoint = current;
  },

  _computeUrl: function(baseUrl, fullUrl) {
    // console.log('_computeUrl', baseUrl, fullUrl);
    this._setUrl(`${baseUrl}${fullUrl}`);
  }

};

})();

Polymer({
  is: 'raml-method-documentation-viewer',

  properties: {
    // data: Object,
    method: Object,
    parentEndpoint: Object,
    parentEndpointName: String,
    baseUrl: String,
    // If true the Try It button will be hidden
    noTryit: Boolean,

    // Traits used in selected endpoint / method
    traits: Array,
    // Security schemas used in selected endpoint / method
    securitySchemas: Array,
    // Uri paramteres used in selected endpoint / method
    uriParameters: Array,
    // types: Array,
    // Query parametres used in selected endpoint / method
    queryParameters: Array,
    // Headers used in selected endpoint / method
    headers: Array,
    // Request bodies used in selected endpoint / method
    bodies: Array,
    // Responses used in selected endpoint / method
    responses: Array,

    hasParameters: Boolean,
    hasUriParameteres: Boolean,
    hasQueryParameteres: Boolean,
    hasHeaders: Boolean,
    hasBodies: Boolean,
    canHasBody: Boolean,
    hasResponses: Boolean,
    hasParentEndpointName: String
  },

  observers: [
    '_parentEndpointChanged(parentEndpoint.*)',
    '_computeHasParameters(uriParameters.*, queryParameters.*)',
    '_computeHasQueryParameteres(queryParameters.*)',
    '_computeHasUriParameteres(uriParameters.*)',
    '_computeHasBodies(bodies.*)',
    '_computeCanHasBody(method.method)',
    '_computeHasHeaders(headers.*)',
    '_computeHasResponses(responses.*)'
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
    if (!m) {
      return '';
    }
    return m.displayName || m.method;
  },

  _computeHideMethodDesc(description) {
    return !description;
  },

  _computeUrl: function(base, path) {
    return base + path;
  },

  _computeHasParameters: function() {
    var a = this.uriParameters;
    var b = this.queryParameters;
    var res = (a && a.length) || (b && b.length);
    this.hasParameters = res;
  },

  _computeHasQueryParameteres: function() {
    // debugger;
    var qp = this.queryParameters;
    var has = qp && qp.length;
    this.hasQueryParameteres = has;
  },

  _computeHasUriParameteres: function() {
    // debugger;
    var qp = this.uriParameters;
    var has = qp && qp.length;
    this.hasUriParameteres = has;
  },

  _computeHasHeaders: function() {
    var h = this.headers;
    var has = h && h.length;
    this.hasHeaders = has;
  },

  _computeHasBodies: function() {
    var b = this.bodies;
    var has = b && b.length;
    this.hasBodies = has;
  },

  _computeCanHasBody: function(method) {
    if (!method) {
      this.canHasBody = false;
      return;
    }
    this.canHasBody = ['GET', 'HEAD'].indexOf(method.toUpperCase()) === -1;
  },

  _computeHasResponses: function() {
    var r = this.responses;
    var has = r && !!r.length;
    this.hasResponses = has;
  },

  _tryIt: function() {
    this.fire('navigate', {
      'section': 'raml',
      'action': 'run'
    });
  }
});

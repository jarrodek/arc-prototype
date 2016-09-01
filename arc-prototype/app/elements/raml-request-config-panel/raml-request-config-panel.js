Polymer({
  is: 'raml-request-config-panel',

  properties: {
    selectedPage: {
      type: Number,
      value: 0
    },

    data: Object,
    method: Object,
    parentEndpoint: Object,
    traits: Array,
    securitySchemas: Array,
    uriParameters: Array,
    queryParams: Array,
    headers: Array,
    bodies: Array,
    responses: Array,
    contentType: {
      type: String,
      notify: true
    }
  }
});

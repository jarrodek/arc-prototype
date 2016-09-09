Polymer({
  is: 'raml-request-panel',

  properties: {
    data: Object,
    selectedApiPath: String,
    selectedApiMethod: Object,
    request: {
      type: Object,
      notify: true
    },
    url: String,
    bodies: Array,
    contentType: {
      type: Object,
      notify: true
    },

    uriParameters: {
      type: Array,
      notify: true
    },

    opened: Boolean,

    statusMessage: String,
    loading: {
      type: Boolean,
      value: false
    },
    hasResponse: {
      type: Boolean,
      value: false
    },
    response: Object
  },

  observers: [
    '_bodiesChanged(bodies.*)',
    '_openedChanged(opened)'
  ],

  _openedChanged: function(opened) {
    if (!opened) {
      return;
    }
    this.selectedApiPath = 'endpoints.0.methods.0';
  },

  _apiMethodChanged: function(e) {
    var m = e.detail.method;
    this.selectedApiMethod = m;
    this.selectedApiPath = e.detail.path;
    this.request.method = m.method;
  },

  _bodiesChanged: function() {
    var b = this.bodies;
    if (!b || !b.length) {
      return;
    }
    // Use first content type
    this.contentType = b[0].contentType;
  },

  run: function() {
    this.fire('run-request');
    this.mockRequest();
  },

  mockRequest: function() {
    this.loading = true;
    this.hasResponse = false;
    this.response = {};

    this.statusMessage = 'Connectind';
    this.async(() => {
      this.statusMessage = 'Sending';
      this.async(() => {
        this.statusMessage = 'Receiving';
        fetch('scripts/mock-response.json')
          .then((response) => {
            response.json().then((json) => {
              console.log('YOLO', json);
              var h = json.headers.map((it) => [it.name, it.value]);
              json._headers = new Headers(h);
              this.response = json;
              this.hasResponse = true;
              this.loading = false;
            });
          });
      }, 100);
    }, 200);
  }
});

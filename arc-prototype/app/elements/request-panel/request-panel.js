Polymer({
  is: 'request-panel',

  properties: {
    request: {
      type: Object,
      notify: true
    },
    contentType: {
      type: Object,
      notify: true
    },
    isPayload: {
      type: Boolean,
      notify: true
    },
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

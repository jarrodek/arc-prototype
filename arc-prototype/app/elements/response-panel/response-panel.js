Polymer({
  is: 'response-panel',

  properties: {
    response: Object,

    request: {
      type: Object,
      value: function() {
        return {
          'messageSent': 'GET /get?query[]=a&query[]=b&alt=json HTTP/1.1\nauthorization: Basic dXNlcjI6cGFzc3dk\ncookie: k1=v1; k2=v2\n\n',
          headers: new Headers({
            'authorization': 'Basic dXNlcjI6cGFzc3dk',
            'cookie': 'k1=v1; k2=v2'
          })
        };
      }
    },

    loadingTime: {
      type: Number,
      readOnly: true,
      notify: true,
      computed: '_computeLoadingTime(response)'
    }
  },

  _computeLoadingTime: function(response) {
    if (!response) {
      return 0;
    }
    var stats = response.stats;
    if (!stats) {
      return 0;
    }
    var value = 0;
    if (stats.connect) {
      value += stats.connect;
    }
    if (stats.receive) {
      value += stats.receive;
    }
    if (stats.send) {
      value += stats.send;
    }
    if (stats.ssl) {
      value += stats.ssl;
    }
    if (stats.wait) {
      value += stats.wait;
    }
    return Math.round(value);
  },
});

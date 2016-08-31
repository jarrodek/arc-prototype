Polymer({
  is: 'history-list',

  properties: {
    sortMethod: {
      type: String,
      value: 'by-time'
    },

    entries: {
      type: Array,
      value: function() {
        return [{
          'title': 'Today',
          'entries': [{
            'time': 1471894517081,
            'method': 'GET',
            'url': 'http://httpbin.org/get?query[]=a&query[]=b',
            'endpoint': true
          },{
            'time': 1471888567163,
            'method': 'GET',
            'url': 'http://127.0.0.1:1337/?chunk=6399&size=10490'
          },{
            'time': 1459957280845,
            'method': 'GET',
            'url': 'http://localhost:8080'
          },{
            'time': 1472211842341,
            'method': 'POST',
            'url': 'http://httpbin.org/drip?numbytes=50&code=200',
            'saved': true
          },{
            'time': 1471952109894,
            'method': 'GET',
            'url': 'http://httpbin.org/drip?numbytes=5',
            'endpoint': true
          },{
            'time': 1461064113471,
            'method': 'GET',
            'url': 'https://github.com/jarrodek/ChromeRestClient/issues/498?%24filter=Name'
          }]
        },{
          'title': 'Yesterday',
          'entries': [{
            'time': 1471890289874,
            'method': 'GET',
            'url': 'http://127.0.0.1:1337/?chunk=6399&size=10489'
          },{
            'time': 1471887051953,
            'method': 'GET',
            'url': 'http://127.0.0.1:1337/?chunk=6399&size=183344'
          },{
            'time': 1471881341552,
            'method': 'GET',
            'url': 'http://127.0.0.1:5000/stream/20'
          },{
            'time': 1471872247838,
            'method': 'GET',
            'url': 'http://httpbin.org/range/1030'
          }]
        }];
      }
    },

    domainEntries: {
      type: Array,
      value: function() {
        return [{
          'domain': 'www.domain.com',
          'paths': [{
            'path': '/',
            'methods': [{
              'name': 'GET'
            },{
              'name': 'PUT'
            },{
              'name': 'DELETE'
            }]
          },{
            'path': '/some-path',
            'methods': [{
              'name': 'GET'
            },{
              'name': 'PUT'
            },{
              'name': 'DELETE'
            }]
          },{
            'path': '/other/path',
            'methods': [{
              'name': 'GET'
            }]
          },]
        },{
          'domain': 'httpbin.org',
          'paths': [{
            'path': '/?chunk=6399&size=10490',
            'methods': [{
              'name': 'GET'
            }]
          },{
            'path': '/get?query[]=a&query[]=b',
            'methods': [{
              'name': 'GET'
            }]
          },{
            'path': '/drip?numbytes=50&code=200',
            'methods': [{
              'name': 'GET'
            }]
          },{
            'path': '/stream/20',
            'methods': [{
              'name': 'GET'
            }]
          }]
        }];
      }
    }
  },

  _getTime: function(time) {
    var d = new Date(time);
    var h = d.getHours();
    var m = d.getMinutes();
    if (m < 10) {
      m = `0${m}`;
    }
    return `${h}:${m}`;
  },

  _selectedSortMethod: function(selected, compare) {
    return selected === compare;
  },

  _togglePaths: function(e) {
    var model = e.model;
    var state = model.get('item.opened');
    if (state === true) {
      state = false;
    } else {
      state = true;
    }
    model.set('item.opened', state);
  },

  _toggleMethods: function(e) {
    var model = e.model;
    var state = model.get('path.opened');
    if (state === true) {
      state = false;
    } else {
      state = true;
    }
    e.model.set('path.opened', state);
  },

  _useRequest: function() {
    this.fire('navigate', {
      'section': 'request',
      'action': 'run'
    });
  },

  _useRaml: function() {
    this.fire('navigate', {
      'section': 'raml',
      'action': 'run'
    });
  }
});

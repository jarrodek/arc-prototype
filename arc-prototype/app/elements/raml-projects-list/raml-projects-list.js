Polymer({
  is: 'raml-projects-list',

  properties: {
    projects: Array
  },

  ready: function() {
    // Mock the data.
    fetch('./scripts/mock-project-list.json').then((response) => {
      return response.json();
    })
    .then((json) => this.projects = json);
  },

  _openProject: function() {
    this.fire('navigate', {
      'section': 'raml',
      'action': 'view'
    });
  },

  _createProject: function() {
    this.fire('navigate', {
      'section': 'raml',
      'action': 'create'
    });
  }
});

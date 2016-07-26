(function() {
'use strict';

Polymer({
  is: 'http-method-selector',
  properties: {
    // Currently selected HTTP method
    method: {
      type: String,
      value: 'GET',
      notify: true
    }
  }
  
});
})();

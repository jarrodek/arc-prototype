var demo = document.querySelector('template');
    demo.selectedCounter = 0;
    demo.queryCounter = 0;
    demo.addEventListener('dom-change', function() {
      var suggestions = ['Apple', 'Apricot', 'Avocado',
      'Banana', 'Bilberry', 'Blackberry', ,'Blackcurrant', 'Blueberry',
      'Boysenberry', 'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya',
      'Cloudberry', 'Coconut', 'Cranberry', 'Damson', 'Date', 'Dragonfruit',
      'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Goji berry', 'Gooseberry',
      'Grape', 'Grapefruit', 'Guava', 'Huckleberry', 'Jabuticaba', 'Jackfruit',
      'Jambul', 'Jujube', 'Juniper berry', 'Kiwi fruit', 'Kumquat', 'Lemon',
      'Lime', 'Loquat', 'Lychee', 'Mango', 'Marion berry', 'Melon', 'Miracle fruit',
      'Mulberry', 'Nectarine', 'Olive', 'Orange'];
      demo.$.fruitsSuggestions.source = suggestions;
      demo.suggestions = suggestions;
      demo.list = [
        {name: 'Apple'},
        {name: 'Damson'},
        {name: 'Feijoa'},
        {name: 'Mango'},
        {name: 'Olive'}
      ];
      demo.$.fruitsSuggestions.target = demo.$.fruits;
      demo.$.fruitExternal.target = demo.$.externalField;
    });
    demo._selectedCalled = function() {
      demo.selectedCounter++;
    };
    demo._queryCalled = function() {
      demo.queryCounter++;
    };
    demo._asyncSuggestions = function(e) {
      var value = e.detail.value;
      demo.async(function() {
        var suggestions = [];
        for (var i = 0; i < 25; i++) {
          suggestions.push(value + '' + chance.word());
        }
        demo.$.fruitExternal.source = suggestions;
      }, 1000);
    };
    demo.removeItem = function(e) {
      var index = this.$.list.indexForElement(e.target);
      this.splice('list', index, 1);
    };
    demo.inputFocus = function(e) {
      var index = this.$.list.indexForElement(e.target);
      var elm = document.querySelector('.form-row:nth-child(' + (index + 1) + ') paper-autocomplete');
      if (!elm) {
        return;
      }
      elm.target = e.target;
    };
    demo.appendListItem = function(e) {
      demo.push('list', {name: ''});
    };
var scope = document.querySelector('template[is=dom-bind]');

      scope.setValue = function(event) {
        if (!(event.target instanceof HTMLButtonElement)) {
          return;
        }
        var inputValue = event.target.previousElementSibling.value;
        if (event.target.value == "bindValue") {
          document.querySelector('#a1').bindValue = inputValue;
        } else {
          document.querySelector('#a1').textarea.value = inputValue;
        }
      };
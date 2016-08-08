function _submit(event) {
            Polymer.dom(event).localTarget.parentElement.submit();
          }
          function _reset(event) {
            var form = Polymer.dom(event).localTarget.parentElement
            form.reset();
            form.querySelector('.output').innerHTML = '';
          }
          basic.addEventListener('iron-form-submit', function(event) {
            this.querySelector('.output').innerHTML = JSON.stringify(event.detail);
          });
function _submit(event) {
            Polymer.dom(event).localTarget.parentElement.submit();
          }
          function _reset(event) {
            var form = Polymer.dom(event).localTarget.parentElement
            form.reset();
            form.querySelector('.output').innerHTML = '';
          }
          submitOptions.addEventListener('iron-form-submit', function(event) {
            this.querySelector('.output').innerHTML = JSON.stringify(event.detail);
          });
function _submit(event) {
            Polymer.dom(event).localTarget.parentElement.submit();
          }
          function _reset(event) {
            var form = Polymer.dom(event).localTarget.parentElement
            form.reset();
            form.querySelector('.output').innerHTML = '';
          }
          presubmit.addEventListener('iron-form-presubmit', function(event) {
            this.request.params['sidekick'] = 'Robin';
          });
          presubmit.addEventListener('iron-form-submit', function(event) {
            this.querySelector('.output').innerHTML = JSON.stringify(event.detail);
          });
eventsDemo.addEventListener('change', function(event) {
            // Validate the entire form to see if we should enable the `Submit` button.
            eventsDemoSubmit.disabled = !eventsDemo.validate();
          });
          function _delayedSubmit(event) {
            spinner.active = true;
            spinner.hidden = false;
            eventsDemoSubmit.disabled = true;
            // Simulate a slow server response.
            setTimeout(function() {
              Polymer.dom(event).localTarget.parentElement.submit();
            }, 1000);
          }
          function _reset(event) {
            var form = Polymer.dom(event).localTarget.parentElement
            form.reset();
            form.querySelector('.output').innerHTML = '';
          }
          document.getElementById('eventsDemo').addEventListener('iron-form-submit', function(event) {
            spinner.active = false;
            spinner.hidden = true;
            eventsDemoSubmit.disabled = false;
            this.querySelector('.output').innerHTML = JSON.stringify(event.detail);
          });
function _nativeSubmit(event) {
            if (redirectDemo.validate()) {
              // For each element the iron-form wants to submit, create a hidden
              // input in the submission form.
              var serializedItems = redirectDemo.serialize();
              for (var name in serializedItems) {
                var input = document.createElement('input');
                input.hidden = true;
                input.name = name;
                input.value = serializedItems[name];
                nativeForm.appendChild(input);
              }
              nativeForm.submit();
            }
          };
var defaultTarget = Polymer.dom(myFit).parentNode;
          var template = document.querySelector('template[is="dom-bind"]');

          template.containers = new Array(30);

          template.updatePositionTarget = function(e) {
            var target = Polymer.dom(e).rootTarget;
            target = myFit.positionTarget === target ? defaultTarget : target;
            myFit.positionTarget.style.backgroundColor = '';
            target.style.backgroundColor = 'orange';
            myFit.positionTarget = target;
            template.refit();
          };

          template._raf = null;
          template.refit = function() {
            template._raf && window.cancelAnimationFrame(template._raf);
            template._raf = window.requestAnimationFrame(function() {
              template._raf = null;
              myFit.refit();
            });
          };

          template.updateAlign = function(e) {
            var target = Polymer.dom(e).rootTarget;
            if (target.hasAttribute('horizontal-align')) {
              myFit.horizontalAlign = target.getAttribute('horizontal-align');
              var children = target.parentNode.querySelectorAll('[horizontal-align]');
              for (var i = 0; i < children.length; i++) {
                toggleClass(children[i], 'selected', children[i] === target);
              }
            }
            if (target.hasAttribute('vertical-align')) {
              myFit.verticalAlign = target.getAttribute('vertical-align');
              var children = target.parentNode.querySelectorAll('[vertical-align]');
              for (var i = 0; i < children.length; i++) {
                toggleClass(children[i], 'selected', children[i] === target);
              }
            }
            template.refit();
          };

          template.toggleNoOverlap = function(e) {
            myFit.noOverlap = !myFit.noOverlap;
            toggleClass(Polymer.dom(e).rootTarget, 'selected', myFit.noOverlap);
            template.refit();
          };

          template.toggleDynamicAlign = function(e) {
            myFit.dynamicAlign = !myFit.dynamicAlign;
            toggleClass(Polymer.dom(e).rootTarget, 'selected', myFit.dynamicAlign);
            template.refit();
          };

          // Listen for resize and scroll on window.
          window.addEventListener('resize', template.refit);
          window.addEventListener('scroll', template.refit);

          function toggleClass(element, cssClass, condition) {
            element.classList[condition ? 'add' : 'remove'](cssClass);
          };
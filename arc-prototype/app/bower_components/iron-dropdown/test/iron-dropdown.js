function elementIsVisible(element) {
      var contentRect = element.getBoundingClientRect();
      var computedStyle = window.getComputedStyle(element);

      return computedStyle.display !== 'none' &&
        contentRect.width > 0 &&
        contentRect.height > 0;
    }

    function runAfterOpen(overlay, callback) {
      overlay.addEventListener('iron-overlay-opened', callback);
      overlay.open();
    }

    function fireWheel(node, deltaX, deltaY) {
      // IE 11 doesn't support WheelEvent, use CustomEvent.
      var event = new CustomEvent('wheel', {
        cancelable: true,
        bubbles: true
      });
      event.deltaX = deltaX;
      event.deltaY = deltaY;
      node.dispatchEvent(event);
      return event;
    }

    function dispatchScroll(target, scrollLeft, scrollTop) {
      target.scrollLeft = scrollLeft;
      target.scrollTop = scrollTop;
      target.dispatchEvent(new CustomEvent('scroll', { bubbles:true } ));
    }

    suite('<iron-dropdown>', function() {
      var dropdown;
      var content;

      suite('basic', function() {
        setup(function() {
          dropdown = fixture('TrivialDropdown');
          content = Polymer.dom(dropdown).querySelector('.dropdown-content');
        });

        test('effectively hides the dropdown content', function() {
          expect(elementIsVisible(content)).to.be.equal(false);
        });

        test('shows dropdown content when opened', function(done) {
          runAfterOpen(dropdown, function() {
            expect(elementIsVisible(content)).to.be.equal(true);
            done();
          });
        });

        test('hides dropdown content when outside is clicked', function(done) {
          runAfterOpen(dropdown, function() {
            expect(elementIsVisible(content)).to.be.equal(true);
            dropdown.addEventListener('iron-overlay-closed', function() {
              expect(elementIsVisible(content)).to.be.equal(false);
              done();
            });
            MockInteractions.tap(dropdown.parentNode);
          });
        });

        suite('when content is focusable', function() {
          setup(function() {
            dropdown = fixture('FocusableContentDropdown');
            content = Polymer.dom(dropdown).querySelector('.dropdown-content');
          });
          test('focuses the content when opened', function(done) {
            runAfterOpen(dropdown, function() {
              expect(document.activeElement).to.be.equal(content);
              done();
            });
          });

          test('focuses a configured focus target', function(done) {
            var focusableChild = Polymer.dom(content).querySelector('div[tabindex]');
            dropdown.focusTarget = focusableChild;

            runAfterOpen(dropdown, function() {
              expect(document.activeElement).to.not.be.equal(content);
              expect(document.activeElement).to.be.equal(focusableChild);
              done();
            });
          });
        });
      });

      suite('locking scroll', function() {

        var bigDiv, scrollTarget;
        suiteSetup(function() {
          bigDiv = document.createElement('div');
          bigDiv.classList.add('big');
          document.body.appendChild(bigDiv);
          // Need to discover if html or body is scrollable.
          // Here we are sure the page is scrollable.
          document.documentElement.scrollTop = 1;
          if (document.documentElement.scrollTop === 1) {
            document.documentElement.scrollTop = 0;
            scrollTarget = document.documentElement;
          } else {
            scrollTarget = document.body;
          }
        });

        suiteTeardown(function() {
          document.body.removeChild(bigDiv);
        });

        setup(function() {
          dropdown = fixture('TrivialDropdown');
        });

        teardown(function() {
          dispatchScroll(scrollTarget, 0, 0);
        });

        test('should lock, only once', function(done) {
          var openCount = 0;
          runAfterOpen(dropdown, function() {
            expect(Polymer.IronDropdownScrollManager._lockingElements.length)
              .to.be.equal(1);
            expect(Polymer.IronDropdownScrollManager.elementIsScrollLocked(document.body))
              .to.be.equal(true);
            expect(fireWheel(document.body, 0, 10).defaultPrevented).to.be.equal(true);

            if (openCount === 0) {
              // This triggers a second `pushScrollLock` with the same element, however
              // that should not add the element to the `_lockingElements` stack twice
              dropdown.close();
              dropdown.open();
            } else {
              done();
            }
            openCount++;
          });
        });

        test('should lock scroll', function(done) {
          runAfterOpen(dropdown, function() {
            dispatchScroll(scrollTarget, 10, 10);
            assert.equal(scrollTarget.scrollTop, 0, 'scrollTop ok');
            assert.equal(scrollTarget.scrollLeft, 0, 'scrollLeft ok');
            done();
          });
        });

        test('can be disabled with `allowOutsideScroll`', function(done) {
          dropdown.allowOutsideScroll = true;
          runAfterOpen(dropdown, function() {
            dispatchScroll(scrollTarget, 10, 10);
            assert.equal(scrollTarget.scrollTop, 10, 'scrollTop ok');
            assert.equal(scrollTarget.scrollLeft, 10, 'scrollLeft ok');
            done();
          });
        });

      });

      suite('non locking scroll', function() {

        setup(function() {
          dropdown = fixture('NonLockingDropdown');
        });

        test('can be disabled with `allowOutsideScroll`', function(done) {
          runAfterOpen(dropdown, function() {
            expect(Polymer.IronDropdownScrollManager.elementIsScrollLocked(document.body))
              .to.be.equal(false);
            expect(fireWheel(document.body, 0, 10).defaultPrevented).to.be.equal(false);
            done();
          });
        });
      });

      suite('aligned dropdown', function() {
        var parent;
        var parentRect;
        var dropdownRect;

        setup(function() {
          parent = fixture('AlignedDropdown');
          dropdown = parent.querySelector('iron-dropdown');
          parentRect = parent.getBoundingClientRect();
        });

        test('can be re-aligned to the right and the top', function(done) {
          runAfterOpen(dropdown, function() {
            dropdownRect = dropdown.getBoundingClientRect();
            assert.equal(dropdownRect.top, parentRect.top, 'top ok');
            assert.equal(dropdownRect.left, 0, 'left ok');
            assert.equal(dropdownRect.bottom, window.innerHeight, 'bottom ok');
            assert.equal(dropdownRect.right, parentRect.right, 'right ok');
            done();
          });
        });

        test('can be re-aligned to the bottom', function(done) {
          dropdown.verticalAlign = 'bottom';
          runAfterOpen(dropdown, function() {
            dropdownRect = dropdown.getBoundingClientRect();
            assert.equal(dropdownRect.top, 0, 'top ok');
            assert.equal(dropdownRect.left, 0, 'left ok');
            assert.equal(dropdownRect.bottom, parentRect.bottom, 'bottom ok');
            assert.equal(dropdownRect.right, parentRect.right, 'right ok');
            done();
          });
        });

        test('handles parent\'s stacking context', function(done) {
          // This will create a new stacking context.
          parent.style.transform = 'translateZ(0)';
          runAfterOpen(dropdown, function() {
            dropdownRect = dropdown.getBoundingClientRect();
            assert.equal(dropdownRect.top, parentRect.top, 'top ok');
            assert.equal(dropdownRect.left, 0, 'left ok');
            assert.equal(dropdownRect.bottom, window.innerHeight, 'bottom ok');
            assert.equal(dropdownRect.right, parentRect.right, 'right ok');
            done();
          });
        });
      });

      suite('when align is left/top, with an offset', function() {
        var dropdownRect;
        var offsetDropdownRect;
        setup(function() {
          var parent = fixture('OffsetDropdownTopLeft');
          dropdown = parent.querySelector('iron-dropdown');
        });

        test('can be offset towards the bottom right', function(done) {
          runAfterOpen(dropdown, function() {
            dropdownRect = dropdown.getBoundingClientRect();
            dropdown.verticalOffset = 10;
            dropdown.horizontalOffset = 10;
            // Force refit instead of waiting for requestAnimationFrame.
            dropdown.refit();
            offsetDropdownRect = dropdown.getBoundingClientRect();
            // verticalAlign is top, so a positive offset moves down.
            assert.equal(dropdownRect.top + 10, offsetDropdownRect.top, 'top ok');
            // horizontalAlign is left, so a positive offset moves to the right.
            assert.equal(dropdownRect.left + 10, offsetDropdownRect.left, 'left ok');
            done();
          });
        });

        test('can be offset towards the top left', function(done) {
          runAfterOpen(dropdown, function() {
            dropdownRect = dropdown.getBoundingClientRect();
            dropdown.verticalOffset = -10;
            dropdown.horizontalOffset = -10;
            // Force refit instead of waiting for requestAnimationFrame.
            dropdown.refit();
            offsetDropdownRect = dropdown.getBoundingClientRect();
            // verticalAlign is top, so a negative offset moves up.
            assert.equal(dropdownRect.top - 10, offsetDropdownRect.top, 'top ok');
            // horizontalAlign is left, so a negative offset moves to the left.
            assert.equal(dropdownRect.left - 10, offsetDropdownRect.left, 'left ok');
            done();
          });
        });
      });

      suite('when align is right/bottom, with an offset', function() {
        var dropdownRect;
        var offsetDropdownRect;
        setup(function() {
          var parent = fixture('OffsetDropdownBottomRight');
          dropdown = parent.querySelector('iron-dropdown');
        });

        test('can be offset towards the top left', function(done) {
          runAfterOpen(dropdown, function() {
            dropdownRect = dropdown.getBoundingClientRect();
            dropdown.verticalOffset = 10;
            dropdown.horizontalOffset = 10;
            // Force refit instead of waiting for requestAnimationFrame.
            dropdown.refit();
            offsetDropdownRect = dropdown.getBoundingClientRect();
            // verticalAlign is bottom, so a positive offset moves up.
            assert.equal(dropdownRect.bottom - 10, offsetDropdownRect.bottom, 'bottom ok');
            // horizontalAlign is right, so a positive offset moves to the left.
            assert.equal(dropdownRect.right - 10, offsetDropdownRect.right, 'right ok');
            done();
          });
        });

        test('can be offset towards the bottom right', function(done) {
          runAfterOpen(dropdown, function() {
            dropdownRect = dropdown.getBoundingClientRect();
            dropdown.verticalOffset = -10;
            dropdown.horizontalOffset = -10;
            // Force refit instead of waiting for requestAnimationFrame.
            dropdown.refit();
            offsetDropdownRect = dropdown.getBoundingClientRect();
            // verticalAlign is bottom, so a negative offset moves down.
            assert.equal(dropdownRect.bottom + 10, offsetDropdownRect.bottom, 'bottom ok');
            // horizontalAlign is right, so a positive offset moves to the right.
            assert.equal(dropdownRect.right + 10, offsetDropdownRect.right, 'right ok');
            done();
          });
        });
      });

      suite('RTL', function() {
        var dropdownRect;

        test('with horizontalAlign=left', function(done) {
          var parent = fixture('RTLDropdownLeft');
          dropdown = parent.querySelector('iron-dropdown');
          runAfterOpen(dropdown, function() {
            // In RTL, if `horizontalAlign` is "left", that's the same as
            // being right-aligned in LTR. So the dropdown should be in the top
            // right corner.
            dropdownRect = dropdown.getBoundingClientRect();
            expect(dropdownRect.top).to.be.equal(0);
            expect(dropdownRect.right).to.be.equal(100);
            done();
          });
        });

        test('with horizontalAlign=right', function(done) {
          var parent = fixture('RTLDropdownRight');
          dropdown = parent.querySelector('iron-dropdown');
          runAfterOpen(dropdown, function() {
            // In RTL, if `horizontalAlign` is "right", that's the same as
            // being left-aligned in LTR. So the dropdown should be in the top
            // left corner.
            dropdownRect = dropdown.getBoundingClientRect();
            expect(dropdownRect.top).to.be.equal(0);
            expect(dropdownRect.left).to.be.equal(0);
            done();
          });
        });
      });

      suite('sizing target', function() {
        setup(function() {
          dropdown = fixture('sizingTarget');
          content = Polymer.dom(dropdown).querySelector('.dropdown-content');
        });

        test('sizingTarget is the content element by default', function(done) {
          runAfterOpen(dropdown, function() {
            expect(dropdown.sizingTarget).to.be.equal(content);
            expect(content.style.maxHeight).to.be.not.empty;
            expect(content.style.maxWidth).to.be.not.empty;
            done();
          });
        });

        test('sizingTarget can be set to a child element', function(done) {
          var subcontent = Polymer.dom(dropdown).querySelector('.subcontent');
          dropdown.sizingTarget = subcontent;

          runAfterOpen(dropdown, function() {
            expect(dropdown.sizingTarget).to.be.equal(subcontent);
            expect(subcontent.style.maxHeight).to.be.not.empty;
            expect(subcontent.style.maxWidth).to.be.not.empty;
            done();
          });
        });
      });
    });
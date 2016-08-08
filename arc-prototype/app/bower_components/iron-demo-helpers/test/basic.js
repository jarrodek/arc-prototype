suite('display', function() {
      var emptyHeight;

      setup(function() {
        var emptyDemo = document.getElementById('emptyDemo');
        emptyHeight = emptyDemo.getBoundingClientRect().height;
      });

      test('can render native elements', function() {
        var element = document.getElementById('nativeDemo');

        // Render the distributed children.
        Polymer.dom.flush();

        var rect = element.getBoundingClientRect();

        expect(rect.height).to.be.greaterThan(emptyHeight);

        // The demo is rendered in the light dom, so it should exist, and
        // it should respect the demo element's attributes, and not make up
        // new ones.
        var input = Polymer.dom(element).querySelector('input')
        expect(input).to.be.ok;
        expect(input.disabled).to.be.true;
        expect(input.checked).to.be.false;

        var markdownElement = element.$.marked;
        expect(markdownElement.markdown).to.be.equal('```\n\n<input disabled>\n\n```');
      });

      test('can render custom elements', function() {
        var element = document.getElementById('customDemo');

        // Render the distributed children.
        Polymer.dom.flush();

        var rect = element.getBoundingClientRect();

        expect(rect.height).to.be.greaterThan(emptyHeight);

        // The demo is rendered in the light dom, so it should exist, and
        // it should respect the demo element's attributes, and not make up
        // new ones.
        var checkbox = Polymer.dom(element).querySelector('paper-checkbox')
        expect(checkbox).to.be.ok;
        expect(checkbox.disabled).to.be.true;
        expect(checkbox.checked).to.be.false;

        var markdownElement = element.$.marked;
        expect(markdownElement.markdown).to.be.equal(
            '```\n\n<paper-checkbox disabled></paper-checkbox>\n\n```');
      });

      test('elements are only rendered once when using a custom type-extension', function() {
        var element = document.getElementById('typeExtensionDemo');

        // Render the distributed children.
        Polymer.dom.flush();

        var inputs = element.querySelectorAll('input');
        expect(inputs.length).to.be.equal(1);
      });

      test('can support databinding between elements', function(done) {
        var element = document.getElementById('typeExtensionDemo');
        var input = Polymer.dom(element).querySelector('input');
        var checkbox = Polymer.dom(element).querySelector('paper-checkbox')

        // Render the distributed children.
        Polymer.dom.flush();

        checkbox.set('checked', true);

        flush(function() {
          expect(checkbox.checked).to.be.equal(true);
          expect(input.value).to.be.equal('true');
          done();
        });
      });
    });

    suite('parsing', function() {
      test('preserves attributes', function() {
        var element = document.getElementById('demoWithAttributes');

        // Render the distributed children.
        Polymer.dom.flush();

        var markdownElement = element.$.marked;
        expect(markdownElement.markdown).to.be.equal(
            '```\n\n<input disabled type="date">\n\n```');
      });
    });
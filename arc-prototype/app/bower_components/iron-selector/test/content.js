var s1 = document.querySelector('#selector1');
    var s2 = document.querySelector('#selector2');
    var s3 = document.querySelector('#selector3');

    var t = document.querySelector('#t');

    suite('content', function() {

      test('attribute selected', function() {
        // check selected class
        assert.isTrue(s1.querySelector('#item0').classList.contains('iron-selected'));
      });

      test('set selected', function() {
        // set selected
        s1.selected = 'item1';
        // check selected class
        assert.isTrue(s1.querySelector('#item1').classList.contains('iron-selected'));
      });

      test('get items', function() {
        assert.equal(s1.$.selector.items.length, 4);
      });

      test('activate event', function() {
        var item = s1.querySelector('#item2');
        item.dispatchEvent(new CustomEvent('tap', {bubbles: true}));
        // check selected class
        assert.isTrue(item.classList.contains('iron-selected'));
      });

      test('add item dynamically', function() {
        var item = document.createElement('div');
        item.id = 'item4';
        item.textContent = 'item4';
        Polymer.dom(s1).appendChild(item);
        Polymer.dom.flush();
        // set selected
        s1.selected = 'item4';
        // check items length
        assert.equal(s1.$.selector.items.length, 5);
        // check selected class
        assert.isTrue(s1.querySelector('#item4').classList.contains('iron-selected'));
      });

    });

    suite('content with selectable', function() {

      test('attribute selected', function() {
        // check selected class
        assert.isTrue(s2.querySelector('#item0').classList.contains('iron-selected'));
      });

      test('set selected', function() {
        // set selected
        s2.selected = 'item1';
        // check selected class
        assert.isTrue(s2.querySelector('#item1').classList.contains('iron-selected'));
      });

      test('get items', function() {
        assert.equal(s2.$.selector.items.length, 4);
      });

      test('activate event', function() {
        var item = s2.querySelector('#item2');
        item.dispatchEvent(new CustomEvent('tap', {bubbles: true}));
        // check selected class
        assert.isTrue(item.classList.contains('iron-selected'));
      });

      test('add item dynamically', function() {
        var item = document.createElement('item');
        item.id = 'item4';
        item.textContent = 'item4';
        Polymer.dom(s2).appendChild(item);
        Polymer.dom.flush();
        // set selected
        s2.selected = 'item4';
        // check items length
        assert.equal(s2.$.selector.items.length, 5);
        // check selected class
        assert.isTrue(s2.querySelector('#item4').classList.contains('iron-selected'));
      });

    });

    suite('content with dom-repeat', function() {

      test('supports repeated children', function(done) {
        t.items = [{name:'item0'}, {name: 'item1'}, {name: 'item2'}, {name: 'item3'}];
        setTimeout(function() {
          // check selected
          assert.equal(s3.selected, 'item0');
          // check selected class
          assert.isTrue(s3.querySelector('#item0').classList.contains('iron-selected'));
          // set selected
          s3.selected = 'item2';
          // check selected class
          assert.isTrue(s3.querySelector('#item2').classList.contains('iron-selected'));
          done();
        });
      });

    });
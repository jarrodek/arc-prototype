var scope = document.querySelector('template[is="dom-bind"]');
      scope.selected = 0;

      scope._onPrevClick = function() {
        this.entryAnimation = 'slide-from-left-animation';
        this.exitAnimation = 'slide-right-animation';
        this.selected = this.selected === 0 ? 4 : (this.selected - 1);
      }

      scope._onNextClick = function() {
        this.entryAnimation = 'slide-from-right-animation';
        this.exitAnimation = 'slide-left-animation';
        this.selected = this.selected === 4 ? 0 : (this.selected + 1);
      }

      scope._onUpClick = function() {
        this.entryAnimation = 'slide-from-top-animation';
        this.exitAnimation = 'slide-down-animation';
        this.selected = this.selected === 4 ? 0 : (this.selected + 1);
      }

      scope._onDownClick = function() {
        this.entryAnimation = 'slide-from-bottom-animation';
        this.exitAnimation = 'slide-up-animation';
        this.selected = this.selected === 0 ? 4 : (this.selected - 1);
      };
function _toggle() {
                  var moreInfo = document.getElementById('more-info');
                  var iconButton = Polymer.dom(event).localTarget;
                  iconButton.icon = moreInfo.opened ? 'hardware:keyboard-arrow-up'
                                                    : 'hardware:keyboard-arrow-down';
                  moreInfo.toggle();
                };
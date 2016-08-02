(function() {

  'use strict';
  /**
  @license
  Copyright 2016 Pawel Psztyc, The ARC team
  Licensed under the Apache License, Version 2.0 (the "License"); you may not
  use this file except in compliance with the License. You may obtain a copy of
  the License at
  http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License for the specific language governing permissions and limitations under
  the License.
  */
  window.ArcBehaviors = window.ArcBehaviors || {};
  /**
   * Behavior for elements that are to be used in the authorization panel as a authorization method.
   *
   * @polymerBehavior ArcBehaviors.AuthPanelBehavior
   */
  window.ArcBehaviors.AuthPanelBehavior = {
    properties: {
      // The value of the authorization header.
      headerValue: {
        type: String,
        notify: true
      },

      // True when the auth method is enabled for this request
      enabled: {
        type: Boolean,
        value: false,
        notify: true
      },

      // True if currently authorizing the request
      authorizing: {
        type: Boolean,
        notify: true
      },
      // True if the alue for header is ready.
      hasValue: {
        type: Boolean,
        value: false,
        computed: '_computeHasValue(headerValue)'
      }
    },

    observers: [
      '_enabledChanged(enabled)'
    ],

    _enabledChanged: function(enabled) {
      var name = 'authorization-' + (enabled ? 'enabled' : 'disabled');
      this.fire(name);
    },

    _computeEnabledLabel: function(enabled) {
      return enabled ? 'ON' : 'OFF';
    },

    _computeHasValue: function(headerValue) {
      return !!headerValue;
    },

    mockAuthorize: function() {
      this.set('authorizing', true);
      this.async(() => {
        this.set('authorizing', false);
        var mockedToken = 'Bearer ya29.Ci8zAw_LEePtQJ15-F-';
        mockedToken += 'IdOkzuNdiX70EpvOI_f6jVWYGcwJfpWbgewvs7t9jmZ2PAw';
        this.set('headerValue', mockedToken);
      }, 1500);
    }
  };
})();

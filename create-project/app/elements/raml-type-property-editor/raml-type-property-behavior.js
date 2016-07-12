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
window.RamlBehaviors = window.RamlBehaviors || {};
/**
 * Common behavior for RAML type's properties.
 *
 * @polymerBehavior RamlBehaviors.RamlTypePropertyBehavior
 */
window.RamlBehaviors.RamlTypePropertyBehavior = {

  properties: {
    /**
     * Type of the property.
     * My be any of the build-in RAML properties or one of declared properties.
     */
    type: {
      type: String,
      value: 'any'
    },

    required: Boolean,

    // A property name
    name: String,

    /**
     * A list of declared in the RAML definition types.
     * Changing this property will change the list of properties available types.
     * Note that Type created from schema can't be extended and therefore it won't be
     * considered bu the UI.
     */
    declaredTypes: {
      type: Array,
      value: function() {
        return [];
      }
    },

    baseTypes: {
      type: Array,
      value: function() {
        return [
          'any',
          'object',
          'array',
          'union',
          'number',
          'boolean',
          'string',
          'date-only',
          'time-only',
          'datetime-only',
          'datetime',
          'file',
          'integer',
          'null'
        ];
      },
      readOnly: true
    },
    // List of available types
    availableTypes: {
      type: Array,
      conputed: '_computeAvailableTypes(baseTypes, declaredTypes.*)'
    },
    // True if the property is an array
    isArray: Boolean,

    // True when the collapsable panel is opened.
    opened: Boolean
  },

  _computeAvailableTypes: function(baseTypes) {
    var declared = this.declaredTypes;
    var result = baseTypes.map((item) => {
      return {
        'value': item,
        'name': item
      };
    });
    if (declared && declared.length) {
      let tmp = declared.map((item) => {
        return {
          'value': item.typeId,
          'name': item.displayName || item.typeId
        };
      });
      result = result.concat(tmp);
    }
    return result;
  }

};
})();

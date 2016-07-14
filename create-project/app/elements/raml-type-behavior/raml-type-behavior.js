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
 * Common behavior for RAML types.
 *
 * @polymerBehavior RamlBehaviors.RamlTypeBehavior
 */
window.RamlBehaviors.RamlTypeBehavior = {
  properties: {
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
          {value: 'any', name: 'Any'},
          {value: 'object', name: 'Object'},
          {value: 'array', name: 'Array'},
          {value: 'union', name: 'Union'},
          {value: 'number', name: 'Number'},
          {value: 'boolean', name: 'Boolean'},
          {value: 'string', name: 'String'},
          {value: 'datetime', name: 'Date and time'},
          {value: 'date-only', name: 'Date only', hidden: true},
          {value: 'time-only', name: 'Time only', hidden: true},
          {value: 'datetime-only', name: 'Date and time only', hidden: true},
          {value: 'file', name: 'File'},
          {value: 'integer', name: 'Integer'},
          {value: 'null', name: 'Null'}
        ];
      },
      readOnly: true
    },
    // List of available types
    availableTypes: {
      type: Array,
      computed: '_computeAvailableTypes(baseTypes, userTypes.*)'
    },
    // List of user defined types
    userTypes: {
      type: Array,
      value: function() {
        return [];
      },
      computed: '_computeUserTypes(declaredTypes.*)'
    },
    hasUserTypes: {
      type: Boolean,
      readOnly: true,
      value: false
    }
  },

  _computeAvailableTypes: function(baseTypes) {
    var declared = this.userTypes;
    var result = baseTypes;
    if (declared && declared.length) {
      result = result.concat(declared);
    }
    return result;
  },

  _computeUserTypes: function() {
    var declared = this.declaredTypes;
    var result = [];
    if (declared && declared.length) {
      let tmp = declared.map((item) => {
        return {
          'value': item.typeId,
          'name': item.displayName || item.typeId
        };
      });
      result = result.concat(tmp);
      this._setHasUserTypes(true);
    } else {
      this._setHasUserTypes(false);
    }
    return result;
  }
};
})();

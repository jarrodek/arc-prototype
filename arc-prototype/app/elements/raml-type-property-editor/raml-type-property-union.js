
Polymer({
  is: 'raml-type-property-union',

  properties: {
    // Alle build-in and user-defined types in the RAML file.
    availableTypes: {
      type: Array
    },
    /**
     * Defined union type
     * Represents a string of the type of union type
     * ## Example
     * ```
     * [ HasHome ,  Dog | Cat, [One, Two] ]
     * ```
     * will be represented as
     * ```
     * {
     * 	type: 'and',
     * 	items: [
     * 		'HasHome',
     * 		{
     * 			type: 'or',
     *   		items: ['Dog', 'Cat']
     * 		},
     * 		{
     * 			type: 'and',
     *   		items: ['One', 'Two']
     * 		},
     * 	]
     * }
     * ```
     */
    unionType: {
      type: Object,
      notify: true
    }
  }

});

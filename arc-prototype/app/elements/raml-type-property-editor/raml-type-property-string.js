
Polymer({
  is: 'raml-type-property-string',

  properties: {
    // Maximum length of the string. Value MUST be equal to or greater than 0.
    maxLength: {
      type: Number,
      notify: true
    },
    // Minimum length of the string. Value MUST be equal to or greater than 0.
    minLength: {
      type: Number,
      notify: true
    },
    // Regular expression that this string should match.
    pattern: {
      type: Number,
      notify: true
    },
    // Property example.
    example: {
      type: String,
      notify: true
    }
  }

});

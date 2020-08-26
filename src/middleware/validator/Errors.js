const requiredTemplate = (fieldName) => `${fieldName} value is required.`;
const maxSizeTemplate = (fieldName, maxSize) => `${fieldName} should has maximum ${maxSize} characters.`;
const minSizeTemplate = (fieldName, minSize) => `${fieldName} should has at least ${minSize} characters.`;

export default {
    REQUIRED: (fieldName) => requiredTemplate(fieldName),
    TOO_LONG: (fieldName, max) => maxSizeTemplate(fieldName, max),
    TOO_SHORT: (fieldName, min) => minSizeTemplate(fieldName, min),
    CONTAINS_SPECIAL_CHARS: (fieldName) => `${fieldName} can contain only numbers and letters.`,
    MUST_START_WITH_LETTER: (fieldName) => `${fieldName} must start with a letter.`,
    CONTAINS_WHITESPACES: (fieldName) => `${fieldName} cannot contains any whitespace characters.`,
    REQUIRE_BIG_LETTER: (fieldName) => `${fieldName} require at least 1 big letter.`,
    REQUIRE_SPECIAL_CHARACTER: (fieldName) => `${fieldName} require at least 1 special character.`,
    CONTAINS_WHITESPACE_CHARACTER: (fieldName) => `${fieldName} cannot contains any whitespace characters.`,
    INVALID_FORMAT: (fieldName) => `${fieldName} has invalid format.`,
    ALREADY_IN_USE: (fieldName) => `${fieldName} is already in use.`,
    USER_DOES_NOT_EXIST: (id) => `User with id=${id} does not exist.`,
};

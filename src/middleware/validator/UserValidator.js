import Errors from './Errors';
import UserService from '../../service/UserService';
import user from '../../config/swagger/user/user';

class UserValidator {
    static FIELDS = {
        USERNAME: {
            FIELD_NAME: 'username',
            MAX: 32,
            MIN: 3,
        },
        PASSWORD: {
            FIELD_NAME: 'password',
            MAX: 32,
            MIN: 8,
        },
        EMAIL: {
            FIELD_NAME: 'email',
        },
    };

    static validateUsername(username) {
        const { FIELD_NAME, MAX, MIN } = UserValidator.FIELDS.USERNAME;

        const noContainSpecialCharactersRegex = /^[\w]*$/;
        const startWithLetterRegex = /^[A-Z]/i;
        const containWhitespaceRegex = /\s/i;

        const errors = [];

        if (!username) {
            errors.push(Errors.REQUIRED(FIELD_NAME));
            return errors;
        }

        if (username.length > MAX) {
            errors.push(Errors.TOO_LONG(FIELD_NAME, MAX));
        }

        if (username.length < MIN) {
            errors.push(Errors.TOO_SHORT(FIELD_NAME, MIN));
        }
        if (!username.match(noContainSpecialCharactersRegex)) {
            errors.push(Errors.CONTAINS_SPECIAL_CHARS(FIELD_NAME));
        }

        if (!username.match(startWithLetterRegex)) {
            errors.push(Errors.MUST_START_WITH_LETTER(FIELD_NAME));
        }

        if (username.match(containWhitespaceRegex)) {
            errors.push(Errors.CONTAINS_WHITESPACES(FIELD_NAME));
        }

        return errors;
    }

    static validatePassword(password) {
        const { FIELD_NAME, MAX, MIN } = UserValidator.FIELDS.PASSWORD;
        const containsAtLeastOneBigLetterRegex = /[A-Z]/;
        const containsAtLeastOneSpecialCharacter = /[^\w\s]|_/i;
        const containWhitespaceRegex = /\s/i;

        const errors = [];

        if (!password) {
            errors.push(Errors.REQUIRED(FIELD_NAME));
            return errors;
        }

        if (password.length > MAX) {
            errors.push(Errors.TOO_LONG(FIELD_NAME, MAX));
        }

        if (password.length < MIN) {
            errors.push(Errors.TOO_SHORT(FIELD_NAME, MIN));
        }

        if (!password.match(containsAtLeastOneBigLetterRegex)) {
            errors.push(Errors.REQUIRE_BIG_LETTER(FIELD_NAME));
        }

        if (!password.match(containsAtLeastOneSpecialCharacter)) {
            errors.push(Errors.REQUIRE_SPECIAL_CHARACTER(FIELD_NAME));
        }

        if (password.match(containWhitespaceRegex)) {
            errors.push(Errors.CONTAINS_WHITESPACE_CHARACTER(FIELD_NAME));
        }

        return errors;
    }

    static validateEmail(email) {
        const { FIELD_NAME } = UserValidator.FIELDS.EMAIL;

        const emailFormatRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        const errors = [];

        if (!email) {
            errors.push(Errors.REQUIRED(FIELD_NAME));
            return errors;
        }

        if (!email.match(emailFormatRegex)) {
            errors.push(Errors.INVALID_FORMAT(FIELD_NAME));
        }

        return errors;
    }

    static async validateUpdateOne({ id, username, email, password }) {
        const errors = [
            ...UserValidator.validateUsername(username),
            ...UserValidator.validatePassword(password),
            ...UserValidator.validateEmail(email),
        ];

        const isUserExists = await UserService.findByPk(id);
        if (!isUserExists) {
            errors.push(Errors.USER_DOES_NOT_EXIST(id));
        }

        return errors;
    }

    static async validateSaveOne({ username, email, password }) {
        const errors = [
            ...UserValidator.validateUsername(username),
            ...UserValidator.validatePassword(password),
            ...UserValidator.validateEmail(email),
        ];

        const isEmailUsed = await UserService.findOneByEmail(email);
        if (isEmailUsed) {
            errors.push(Errors.ALREADY_IN_USE(UserValidator.FIELDS.EMAIL.FIELD_NAME));
        }

        const isUsernameUsed = await UserService.findOneByUsername(username);
        if (isUsernameUsed) {
            errors.push(Errors.ALREADY_IN_USE(UserValidator.FIELDS.USERNAME.FIELD_NAME));
        }

        return errors;
    }
}

export default {
    validateSaveOne: UserValidator.validateSaveOne,
    validateUpdateOne: UserValidator.validateUpdateOne,
};

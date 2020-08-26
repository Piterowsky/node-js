import Errors from './Errors';
import User from '../../model/UserModel';

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

    static async validateUsername(username) {
        const { FIELD_NAME, MAX, MIN } = UserValidator.FIELDS.USERNAME;

        const noContainSpecialCharactersRegex = /^[A-Z]*$/i;
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

        if (username.match(noContainSpecialCharactersRegex)) {
            errors.push(Errors.CONTAINS_SPECIAL_CHARS(FIELD_NAME));
        }

        if (!username.match(startWithLetterRegex)) {
            errors.push(Errors.MUST_START_WITH_LETTER(FIELD_NAME));
        }

        if (username.match(containWhitespaceRegex)) {
            errors.push(Errors.CONTAINS_WHITESPACES(FIELD_NAME));
        }

        const isUsernameAlreadyUsed = await User.findOne({
            where: {
                username: username
            }
        });
        if(isUsernameAlreadyUsed) {
            errors.push(Errors.ALREADY_IN_USE(FIELD_NAME));
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

    static async validateEmail(email) {
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

        const isEmailUsed = await User.findOne({
            where: {
                email: email
            }
        });
        console.log(isEmailUsed);
        if(isEmailUsed) {
            errors.push(Errors.ALREADY_IN_USE(FIELD_NAME));
        }

        return errors;
    }

    static async validateSaveOne(req) {
        const { username, email, password } = req.body;

        return [
            ...await UserValidator.validateUsername(username),
            ...UserValidator.validatePassword(password),
            ...await UserValidator.validateEmail(email),
        ];
    }
}

export default { validateSaveOne: UserValidator.validateSaveOne };

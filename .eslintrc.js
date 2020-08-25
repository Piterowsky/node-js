module.exports = {
    env: {
        es2020: true,
        node: true,
        jest: true,
    },
    parser: "babel-eslint",
    extends: ['standard', 'prettier'],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    rules: {
        'require-await': 'error',
    },
};

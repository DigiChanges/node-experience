module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        indent: [1, 4, {SwitchCase: 1}],
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
        "semi-spacing": ["warn", {"before": false, "after": true}],
        "comma-spacing": ["warn", {"before": false, "after": true}],
        "space-infix-ops": 2,
        "space-in-parens": [1, "never"],
        "array-bracket-spacing": ["warn", "never"],
        "object-curly-spacing": ["warn", "never"],
        "block-spacing": "warn",
        "arrow-spacing": "warn",
        "space-before-function-paren": ["warn", "never"],
        "keyword-spacing": ["warn", {"before": true}],
        "linebreak-style": ["error", "unix"],
        "brace-style": ["error", "allman"],
        "no-unused-vars": ["error", {"args": "none"}],
        "prefer-const": ["warn"],
    }   
};

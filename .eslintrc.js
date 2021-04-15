module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module',
        'project': ['tsconfig.json']
    },
    'ignorePatterns': ['.eslintrc.js'],
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
    ],
    'settings': {
        'import/resolver': {
            typescript: {}
        }
    },
    'parser': '@typescript-eslint/parser',
    'plugins': [
        'import',
        'prefer-arrow',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [1, 4, {SwitchCase: 1}],
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
        'semi-spacing': ['warn', {'before': false, 'after': true}],
        'comma-spacing': ['warn', {'before': false, 'after': true}],
        'space-infix-ops': 2,
        'space-in-parens': [1, 'never'],
        'array-bracket-spacing': ['warn', 'never'],
        'object-curly-spacing': ['warn', 'never'],
        'block-spacing': 'warn',
        'arrow-spacing': 'warn',
        'space-before-function-paren': ['warn', 'never'],
        'keyword-spacing': ['warn', {'before': true}],
        'linebreak-style': ['error', 'unix'],
        'brace-style': ['error', 'allman'],
        'prefer-const': ['warn'],
        'no-trailing-spaces': ['warn', {'ignoreComments': false, 'skipBlankLines': false}],
        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],
        'no-console': 1,
        'prefer-template': 'error',
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/restrict-template-expressions': 0,
        '@typescript-eslint/unbound-method': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/require-await': 0
    }
};

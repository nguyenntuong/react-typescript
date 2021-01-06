module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'react-app',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['build', 'node_modules', 'serviceWorker.ts', 'tools'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/ban-types': 'off',
        'no-empty-pattern': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};

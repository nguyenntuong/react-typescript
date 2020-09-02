const { ESLint } = require('eslint');

const cli = new ESLint({});

module.exports = {
    '*.{js,jsx,ts,tsx}': (files) =>
        'npm run lint:eslint:file:fix ' + files.filter((file) => !cli.isPathIgnored(file)).join(' '),
};

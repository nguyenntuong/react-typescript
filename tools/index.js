const { argv } = require('process');
const { g } = require('./scripts/g');

const args = argv.splice(2);
const mode = args[0];
switch (mode) {
    case 'g':
    case 'generate':
        g(...args.splice(1));
        break;

    default:
        console.log(`
        g [componentType] [componentName]: Generate new component.
        `);
        break;
}

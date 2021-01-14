const fs = require('fs');

/**
 * G
 * @param {string} componentType
 * @param {string} componentName
 */
module.exports.g = function g(componentType, componentName) {
    if (!componentName || componentName == '') {
        console.log(`
        [componentName] must not empty.
        `);
    }
    switch (componentType) {
        case 'component':
            component(componentName);
            break;

        case 'feature':
            container(componentName);
            break;

        default:
            console.log(`
            [component | feature]
            `);
            break;
    }
    console.log(`${componentType} with name ${componentName} was created successfull!`);
};

const componentsDirPath = 'src/component';
const containerDirPath = 'src/feature';

const templateComponentPath = 'tools/templates/component';
const templateContainerPath = 'tools/templates/feature';

const templateExtension = '.template';

/**
 *
 * @param {string} path
 * @returns {string[]}
 */
function getAllTemplate(path) {
    const templates = [];
    const dirContents = fs.readdirSync(path, {
        withFileTypes: true,
    });
    for (const item of dirContents) {
        if (item.isFile()) {
            templates.push(`${path}/${item.name}`);
        } else if (item.isDirectory()) {
            templates.push(...getAllTemplate(`${path}/${item.name}`));
        }
    }
    return templates;
}
/**
 *
 * @param {string} componentName
 */
function component(componentName) {
    const dir = `${componentsDirPath}/${componentName}`;
    fs.mkdirSync(dir, {
        recursive: true,
    });
    const allTempaltes = getAllTemplate(templateComponentPath);
    for (const template of allTempaltes) {
        const newPath = template.replace(templateComponentPath, dir);
        fs.mkdirSync(newPath.substring(0, newPath.lastIndexOf('/')), {
            recursive: true,
        });
        let content = fs.readFileSync(template, {
            encoding: 'utf8',
        });
        content = content
            .replace(/(__Component__)/g, componentName.replace(/ /g, ''))
            .replace(/(__COMPONENT__)/g, componentName.replace(/ /g, '').toUpperCase());
        fs.writeFileSync(newPath.replace(templateExtension, ''), content);
    }
}
/**
 *
 * @param {string} containerName
 */
function container(containerName) {
    const dir = `${containerDirPath}/${containerName}`;
    fs.mkdirSync(dir, {
        recursive: true,
    });
    const allTempaltes = getAllTemplate(templateContainerPath);
    for (const template of allTempaltes) {
        const newPath = template.replace(templateContainerPath, dir);
        fs.mkdirSync(newPath.substring(0, newPath.lastIndexOf('/')), {
            recursive: true,
        });
        let content = fs.readFileSync(template, {
            encoding: 'utf8',
        });
        content = content
            .replace(/(__Component__)/g, containerName.replace(/ /g, ''))
            .replace(/(__COMPONENT__)/g, containerName.replace(/ /g, '').toUpperCase());
        fs.writeFileSync(newPath.replace(templateExtension, ''), content);
    }
}

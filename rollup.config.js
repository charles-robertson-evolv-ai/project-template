import copy from 'rollup-plugin-copy';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const evolvConfig = require('./src/config/evolv-config.json');

function buildServeFile(path) {
    var input = `./src/contexts/${path}`;
    var output = `./serve/${path}`;

    return {
        input: `${input}.js`,
        output: {
            file: `${output}.js`,
            format: 'iife',
        },
    };
}

function buildExportFile(path) {
    var input = `./src/contexts/${path}`;
    var output = `./export/.build/${path}`;

    return {
        input: `${input}.js`,
        output: { file: `${output}.js` },
    };
}

function extractFiles(config, buildFile) {
    var files = [];
    config.contexts.forEach((context) => {
        var contextPath = `${context.id}`;
        files = [...files, buildFile(`${contextPath}/context`)];
        files.push(buildFile(`${contextPath}/context`));
        context.variables.forEach((concept) => {
            var conceptPath = `${contextPath}/${concept.id}`;
            concept.variants.forEach((variant) =>
                files.push(buildFile(`${conceptPath}/${variant.id}`))
            );
        });
    });
    return files;
}

var files = extractFiles(evolvConfig, buildServeFile);
files.push(...extractFiles(evolvConfig, buildExportFile));
files.push({
    input: `./src/local/catalyst-local.js`,
    output: {
        dir: `./serve`,
        format: 'iife',
    },
    plugins: [
        copy({
            targets: [
                { src: './src/local/scaffold-loader.js', dest: './serve' },
            ],
        }),
        nodeResolve(),
    ],
});

// console.info('config', JSON.stringify(files));
export default files;

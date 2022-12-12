import copy from 'rollup-plugin-copy';
// import scss from 'rollup-plugin-scss';

const evolvConfig = require('./evolv-config.json');

function buildFile(path) {
    var input = `./src/${path}`;
    var output = `./dist/${path}`;

    return {
        input: `${input}.js`,
        output: {
            file: `${output}.js`,
            format: 'iife',
        },
        // plugins: [
        //     scss({
        //         include: [`${input}.scss`],
        //         output: `${output}.css`,
        //     }),
        // ],
    };
}

function extractFiles(config) {
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

var files = extractFiles(evolvConfig);
files.push({
    input: `./loader/local-loader.js`,
    output: {
        file: `./dist/local-loader.js`,
    },
    plugins: [
        copy({
            targets: [
                { src: 'src/integrations/catalyst-local.js', dest: 'dist' },
            ],
        }),
    ],
});

// console.info('config', JSON.stringify(files))
export default files;

const evolvConfig = require('./evolv-config.json');

function buildFile(path) {
    var input = `./src/${path}`;
    var output = `./export/build/${path}`;

    return {
        input: `${input}.js`,
        output: {
            file: `${output}.js`,
        },
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

// console.info('config', JSON.stringify(files))
export default files;

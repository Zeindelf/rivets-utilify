
const babel = require('rollup-plugin-babel');
const pkg = require('./package');

const now = new Date();
const banner = `
/*!!
 * Boilerplate.js v${pkg.version}
 * https://github.com/${pkg.repository}
 *
 * Copyright (c) 2017-${now.getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 *
 * Date: ${now.toISOString()}
 */
`;

module.exports = {
    // Export banner
    banner,
    input: 'src/rivets-utilify.js',
    output: [
        {
            banner: banner,
            file: 'dist/rivets-utilify.js',
            format: 'umd',
            name: 'RivetsUtilify',
        },
        {
            banner: banner,
            file: 'dist/rivets-utilify.common.js',
            format: 'cjs',
        },
        {
            banner: banner,
            file: 'dist/rivets-utilify.esm.js',
            format: 'es',
        },
    ],
    plugins: [
        babel({
            exclude: 'node_modules/**',
            plugins: ['external-helpers'],
        }),
    ],
};

import babel       from 'rollup-plugin-babel';
import builtins    from "rollup-plugin-node-builtins"
import resolve     from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import replace     from "rollup-plugin-replace"
import nodeGlobals from "rollup-plugin-node-globals"
import json        from "rollup-plugin-json"
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default [{
  input: 'src/main.browser.js',
  output: {
    file: 'dist/packagecloud.browser.js',
    format: 'iife'
  },
  plugins: [
    babel({"babelrc": false, exclude: ["package.json", "node_modules/**"], "presets": [
      [
        "env", {
          "modules": false // ES6 modules are handled with rollup,
        }                  // this tells babel not to transform modules.
      ]
    ]}), resolve({browser: true}), replace({
      include: '**/node_modules/formidable/lib/**',
      values: { 'global.GENTLY': 'false' }
    }), builtins(),
    json(),
    commonjs({include: 'node_modules/**',
              namedExports: {'superagent': [ 'superagent' ]} }),
    nodeGlobals(),
    uglify()
  ]
}, {
  input: 'src/main.js',
  output: {
    file: 'dist/packagecloud.js',
    format: 'cjs'
  },
  plugins: [json(), uglify({}, minify)],
  external: ['superagent']
}];

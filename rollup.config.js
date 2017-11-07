import builtins    from "rollup-plugin-node-builtins"
import resolve     from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import replace     from "rollup-plugin-replace"
import nodeGlobals from "rollup-plugin-node-globals"
import json        from "rollup-plugin-json"

export default [{
  input: 'src/main.js',
  output: {
    file: 'dist/packagecloud.browser.js',
    format: 'iife'
  },
  plugins: [
    resolve({browser: true}), replace({
      include: '**/node_modules/formidable/lib/**',
      values: { 'global.GENTLY': 'false' }
    }), builtins(),
    json(),
    commonjs({include: 'node_modules/**',
              namedExports: {'superagent': [ 'superagent' ]} }),
    nodeGlobals()
  ]
}, {
  input: 'src/main.js',
  output:     {
    file: 'dist/packagecloud.js',
    format: 'cjs',
    external: ['superagent']
  }
}];

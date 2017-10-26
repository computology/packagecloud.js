import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/packagecloud.js',
  output: {
    file: 'dist/packagecloud.js',
    format: 'iife'
  },
  name: "test",
  globals: {window: 'window'},
  plugins: [ resolve() ],
  external: ['window']
};

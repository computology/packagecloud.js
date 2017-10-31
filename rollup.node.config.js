export default {
  input: 'src/main.js',
  output: {
    file: 'dist/packagecloud.js',
    format: 'cjs'
  },
  external: ['superagent']
};

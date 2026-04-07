const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'ds',
      buildPath: 'dist/css/',
      files: [{ destination: 'variables.css', format: 'css/variables' }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [{ destination: 'tokens.d.ts', format: 'typescript/es6-declarations' }]
    }
  }
};

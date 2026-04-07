import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      prefix: 'ds',
      buildPath: 'dist/css/',
      files: [{ destination: 'variables.css', format: 'css/variables' }]
    },
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/js/',
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }]
    },
    ts: {
      transformGroup: 'tokens-studio',
      buildPath: 'dist/ts/',
      files: [{ destination: 'tokens.d.ts', format: 'typescript/es6-declarations' }]
    }
  }
});

await sd.buildAllPlatforms();

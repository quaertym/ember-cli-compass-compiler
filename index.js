var path = require('path');
var merge = require('lodash-node/modern/objects/merge');
var compileCompass = require('broccoli-compass-compiler');

module.exports = {
  name: 'ember-cli-compass-compiler',
  included: function(app) {
    this._super.included.apply(this, arguments);
    app.registry.add('css', {
      name: 'ember-cli-compass-compiler',
      ext: ['scss', 'sass'],
      toTree: function(tree, inputPath, outputPath) {
        if (inputPath[0] === '/') {
          inputPath = inputPath.slice(1);
        }

        if (outputPath[0] === '/') {
          outputPath = outputPath.slice(1);
        }

        var options = app.options.compassOptions || {};
        var defaultOptions = {
          outputStyle: 'compressed',
          compassCommand: 'compass',
          getCssDir: function(outputDir) {
            return path.join(outputDir, outputPath);
          }
        };

        var compassOptions = merge(defaultOptions, options);
        return compileCompass([inputPath], compassOptions);
      }
    });
  }
};

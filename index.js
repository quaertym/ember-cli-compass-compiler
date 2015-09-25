var path = require('path');
var merge = require('lodash-node/modern/objects/merge');
var compileCompass = require('broccoli-compass-compiler');
var renameFiles = require('broccoli-rename-files');

module.exports = {
  name: 'ember-cli-compass-compiler',
  included: function(app) {
    this._super.included.apply(this, arguments);
    var projectName = app.project.name();

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

        var compassTree = compileCompass([inputPath], compassOptions);
        var outputTree = renameFiles(compassTree, {
          transformFilename: function(filename, basename, extname) {
            if (basename === 'app' && extname === '.css') {
              return filename.replace(basename, projectName);
            }
            return filename;
          }
        });

        return outputTree;
      }
    });
  }
};

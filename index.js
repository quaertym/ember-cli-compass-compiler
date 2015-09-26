var path = require('path');
var merge = require('lodash-node/modern/objects/merge');
var compileCompass = require('broccoli-compass-compiler');
var renameFiles = require('broccoli-rename-files');
var checker = require('ember-cli-version-checker');

var removeLeadingSlash = function(string) {
  return (string.length > 0 && string[0] === '/') ? string.slice(1) : string;
};

function CompassCompilerPlugin(optionsFn) {
  this.name = 'ember-cli-compass-compiler';
  this.ext = ['scss', 'sass'];
  this.optionsFn = optionsFn;
}

CompassCompilerPlugin.prototype.toTree = function(tree, inputPath, outputPath, inputOptions) {

  // Normalize paths
  inputPath = removeLeadingSlash(inputPath);
  outputPath = removeLeadingSlash(outputPath);

  // Merge default options with supplied options
  var defaultOptions = {
    outputStyle: 'compressed',
    compassCommand: 'compass',
    importPath: [],
    getCssDir: function(outputDir) {
      return path.join(outputDir, outputPath);
    }
  };
  var compassOptions = merge({}, defaultOptions, this.optionsFn(), inputOptions);
  var projectName = compassOptions.outputFile;
  delete compassOptions.outputFile;

  // Watch importPath directories
  var inputTrees = [inputPath];
  if (compassOptions.importPath.length > 0) {
    inputTrees = inputTrees.concat(compassOptions.importPath);
  }

  // Compile and rename app.css => project-name.scss
  var compassTree = compileCompass(inputTrees, compassOptions);
  var outputTree = renameFiles(compassTree, {
    transformFilename: function(filename, basename, extname) {
      if (basename === 'app' && extname === '.css') {
        return filename.replace(basename, projectName);
      }
      return filename;
    }
  });

  return outputTree;
};

module.exports = {
  name: 'Ember CLI Compass Compiler',

  shouldSetupRegistryInIncluded: function() {
    return !checker.isAbove(this, '0.2.0');
  },

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('css', new CompassCompilerPlugin(this.compassOptions.bind(this)));

    // prevent conflict with broccoli-sass if it's installed
    if (registry.remove) registry.remove('css', 'broccoli-sass');
  },

  included: function(app) {
    this.app = app;
    this._super.included.apply(this, arguments);

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    }
  },

  compassOptions: function () {
    var options = (this.app && this.app.options.compassOptions) || {};
    options.outputFile = options.outputFile || this.app.project.name();
    return options;
  }
};

var compile    = require('./compiler');
var merge      = require('lodash-node/modern/objects/merge');
var path       = require('path');
var mergeTrees = require('broccoli-merge-trees');
var fs         = require('fs');

function CompassCompilerPlugin(options) {
  this.name = 'ember-cli-compass-compiler';
  this.ext = ['scss', 'sass'];
  this.options = merge({
    compassCommand: 'compass',
    outputStyle: 'compressed'
  }, options);

}

CompassCompilerPlugin.prototype.toTree = function(tree, inputPath, outputPath, options) {
  options = merge({}, this.options, options);
  inputPath = (inputPath[0] === '/') ? inputPath.slice(1) : inputPath;
  outputPath = (outputPath[0] === '/') ? outputPath.slice(1) : outputPath;

  var paths = options.outputPaths;
  var trees = Object.keys(paths).map(function(file) {
    var input = path.join(inputPath, file + '.');
    input += (fs.existsSync(input + this.ext[0])) ? this.ext[0] : this.ext[1];

    merge(options, {
      inputFile: input,
      outputFile: paths[file],
      sassDir: inputPath,
      cssDir: paths[file].substring(0, paths[file].lastIndexOf('/') + 1)
    });

    return compile([tree], options);
  }.bind(this));
  
  return mergeTrees(trees);
}

function EmberCLICompassCompiler(project) {
  this.project = project;
  this.name = "Ember CLI Compass Compiler";
}

EmberCLICompassCompiler.prototype.included = function included(app) {
  var options = app.options.compassOptions || {};
  app.registry.add('css', new CompassCompilerPlugin(options));
}

module.exports = EmberCLICompassCompiler;

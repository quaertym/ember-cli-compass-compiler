/* global require, module */
'use strict';

var mergeTrees  = require('broccoli-merge-trees');
var compileCompass = require('broccoli-compass');

function CompassCompilerPlugin(options, appName) {
  this.name    = 'ember-cli-compass-compiler';
  this.appName = appName;
  this.options = options || {};
  this.ext     = 'scss';
}

CompassCompilerPlugin.prototype.toTree = function(tree, inputPath, outputPath) {
  // broccoli-compass doesn't like leading slashes
  if (inputPath[0] === '/') { inputPath = inputPath.slice(1); }

  var options        = this.options;
  var mainFile       = options.mainFile       || (this.appName + '.' + this.ext);
  var outputStyle    = options.outputStyle    || 'compressed'; // or expanded
  var sassDir        = options.sassDir        || inputPath;
  var cssDir         = options.cssDir         || outputPath;
  var imagesDir      = options.imagesDir      || 'images';
  var fontsDir       = options.fontsDir       || 'fonts';
  var require        = options.require;
  var compassCommand = options.compassCommand || 'compass';
  var importPath     = options.importPath     || [];

  var compassOptions = {
    outputStyle: outputStyle,
    require: require,
    sassDir: sassDir,
    imagesDir: imagesDir,
    fontsDir: fontsDir,
    cssDir: cssDir,
    compassCommand: compassCommand,
    importPath: importPath
  };

  tree = mergeTrees([tree, 'public'], {
    description: 'TreeMerger (stylesAndVendorAndPublic)'
  });

  return compileCompass(tree, inputPath + '/' + mainFile, compassOptions);
};

function EmberCLICompassCompiler(project) {
  this.project = project;
  this.name    = 'Ember CLI Compass Compiler';
}

EmberCLICompassCompiler.prototype.treeFor = function treeFor() {

};

EmberCLICompassCompiler.prototype.included = function included(app) {
  this.app     = app;
  var registry = this.app.registry;
  var plugin   = new CompassCompilerPlugin(this.app.options.compassOptions, this.app.name);
  registry.add('css', plugin);
};

module.exports = EmberCLICompassCompiler;

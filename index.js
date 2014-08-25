/* global require, module */
'use strict';

var mergeTrees  = require('broccoli-merge-trees');
var compileCompass = require('broccoli-compass');

function CompassCompilerPlugin(app) {
  this.name    = 'ember-cli-compass-compiler';
  this.app     = app;
  this.appName = app.name;
  this.ext     = 'scss';
}

CompassCompilerPlugin.prototype.toTree = function(tree, inputPath, outputPath) {
  // broccoli-compass doesn't like leading slashes
  if (inputPath[0] === '/') { inputPath = inputPath.slice(1); }
  if (outputPath[0] === '/') { outputPath = outputPath.slice(1); }

  var options        = this.app.options.compassOptions || {};
  var mainFile       = options.mainFile       || (this.appName + '.' + this.ext);
  var relativeAssets = options.relativeAssets !== undefined ? options.relativeAssets : true;
  var outputStyle    = options.outputStyle    || 'compressed'; // or expanded
  var sassDir        = options.sassDir        || inputPath;
  var cssDir         = options.cssDir         || outputPath;
  var imagesDir      = options.imagesDir      || 'images';
  var fontsDir       = options.fontsDir       || 'fonts';
  var compassCommand = options.compassCommand || 'compass';

  var compassOptions = {
    relativeAssets: relativeAssets,
    outputStyle: outputStyle,
    require: options.require,
    importPath: options.importPath,
    httpPath: options.httpPath,
    sassDir: sassDir,
    imagesDir: imagesDir,
    fontsDir: fontsDir,
    cssDir: cssDir,
    compassCommand: compassCommand
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
  var plugin   = new CompassCompilerPlugin(app);
  registry.add('css', plugin);
};

module.exports = EmberCLICompassCompiler;

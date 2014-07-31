/* global require, module */
'use strict';

// var path = require('path');
// var fs   = require('fs');
var mergeTrees  = require('broccoli-merge-trees');
var compileCompass = require('broccoli-compass');

function EmberCLICompassCompiler(project) {
  this.project = project;
  this.name    = 'Ember CLI Compass Compiler';
  // this.options = options || {};
}

EmberCLICompassCompiler.prototype.toTree = function(tree, inputPath, outputPath) {
  // broccoli-compass doesn't like leading slashes
  if (inputPath[0] === '/') { inputPath = inputPath.slice(1); }

  tree = mergeTrees([tree, 'public'], {
    description: 'TreeMerger (stylesAndVendorAndPublic)'
  });

  var compassOptions = {
    outputStyle: 'compressed', // or expanded
    require: 'sass-css-importer', // Allows us to import CSS files with @import("CSS:path")
    sassDir: inputPath,
    imagesDir: 'images',
    // fontsDir: 'fonts',
    cssDir: outputPath
  };

  return compileCompass(tree, inputPath + '/' + 'app.scss', compassOptions);
};

EmberCLICompassCompiler.prototype.treeFor = function treeFor() {

};

EmberCLICompassCompiler.prototype.included = function included(app) {
  var registry = app.registry;
  this.app = app;
  // var plugin = new EmberCLICompassCompiler(this.app.options.compassCompilerOptions);
  var plugin = new EmberCLICompassCompiler();
  registry.add('css', plugin, 'scss');
};

module.exports = EmberCLICompassCompiler;

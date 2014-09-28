var Writer  = require('broccoli-caching-writer');
var Compass = require('./compass');

module.exports = CompassCompiler;
CompassCompiler.prototype = Object.create(Writer.prototype);
CompassCompiler.prototype.constructor = CompassCompiler;

function CompassCompiler(inputTree, options) {
  this.options = options || {};
  if (!(this instanceof CompassCompiler)) return new CompassCompiler(inputTree, options);

  this.inputTree = inputTree;
  this.compass = new Compass();
}

CompassCompiler.prototype.updateCache = function(srcDir, destDir) {
  return this.compass.compile(srcDir, destDir, this.options);
};

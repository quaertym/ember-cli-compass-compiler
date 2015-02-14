var CachingWriter  = require('broccoli-caching-writer');
var Compass = require('./compass');

module.exports = CompassCompiler;
CompassCompiler.prototype = Object.create(CachingWriter.prototype);
CompassCompiler.prototype.constructor = CompassCompiler;

function CompassCompiler(sourceTrees, options) {
  if (!(this instanceof CompassCompiler)) return new CompassCompiler(sourceTrees, options);

  CachingWriter.apply(this, arguments);

  this.sourceTrees = sourceTrees;
  this.options = options || {};
}

CompassCompiler.prototype.updateCache = function(srcDir, destDir) {
  compass = new Compass();
  return compass.compile(srcDir, destDir, this.options);
};

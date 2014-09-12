var dargs = require('dargs');
var EOL   = require('os').EOL;
var exec  = require('child_process').exec;
var merge = require('lodash-node/modern/objects/merge');
var path  = require('path');
var RSVP  = require('rsvp');
var sys   = require('sys');

var ignoredOptions = [
  'compassCommand'
];

function Compass(options) {
  this.options = options || {};
}

Compass.prototype.generateCommand = function() {
  var args = dargs(this.options, ignoredOptions);
  var command = [this.options.compassCommand, 'compile'].concat(args).join(' ');
  return command;
};

Compass.prototype.compile = function(srcDir, destDir) {

  var cssDir  = path.join(destDir, this.options.cssDir);
  merge(this.options, { cssDir: cssDir });

  var command = this.generateCommand();
  
  // var execOptions = {
  //   cwd: srcDir
  // };

  var promise = new RSVP.Promise(function(resolve, reject) {
    exec(command, function(error, stdout, stderr) {
      if(stderr) {
        sys.print(stderr + EOL);
      }

      if (error) {
        sys.print(error + EOL);
        reject(error);
      } else {
        resolve(cssDir);
      }
    });
  });

  return promise;
};

module.exports = Compass;

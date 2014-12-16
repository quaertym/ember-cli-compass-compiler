var dargs = require('dargs');
var EOL   = require('os').EOL;
var exec  = require('child_process').exec;
var merge = require('lodash-node/modern/objects/merge');
var path  = require('path');
var RSVP  = require('rsvp');
var sys   = require('sys');

function Compass() {

}

Compass.prototype.generateCommand = function(options) {
  var ignoredOptions = ['compassCommand'];
  var args = dargs(options, ignoredOptions);
  var command = [options.compassCommand, 'compile'].concat(args).join(' ');
  return command;
};

Compass.prototype.compile = function(srcDir, destDir, options) {
  var cssDir  = path.join(destDir, 'assets');

  merge(options, {
    cssDir: "'"+cssDir+"'"
  });

  var command = this.generateCommand(options);

  return new RSVP.Promise(function(resolve, reject) {
    exec(command, function(error, stdout, stderr) {
      if (stderr) {
        sys.print(stderr + EOL);
      }

      if (error) {
        sys.print(stdout + EOL);
        reject(error);
      } else {
        resolve(cssDir);
      }
    });
  });
};

module.exports = Compass;

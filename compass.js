var dargs = require('dargs');
var EOL   = require('os').EOL;
var exec  = require('child_process').exec;
var merge = require('lodash-node/modern/objects/merge');
var path  = require('path');
var RSVP  = require('rsvp');
var sys   = require('sys');
var fs    = require('fs');

function Compass() {};

Compass.prototype.generateCommand = function(options) {
  var ignoredOptions = ['compassCommand', 'inputFile', 'outputFile'];
  var args = dargs(options, { excludes: ignoredOptions });
  var command = [options.compassCommand, 'compile', options.Fileinput].concat(args).join(' ');

  return command;
};

Compass.prototype.compile = function(srcDir, destDir, options) {
  var cssDir  = path.join(destDir, options.cssDir);
  var outputFile = options.outputFile;
  var outputFileName = outputFile.substring(outputFile.lastIndexOf('/') + 1, outputFile.length);
  var command = this.generateCommand(merge({}, options, { cssDir: cssDir }));

  return new RSVP.Promise(function(resolve, reject) {
    exec(command, function(error, stdout, stderr) {
      if (stderr) {
        sys.print(stderr + EOL);
      }

      if (error) {
        sys.print(stdout + EOL);
        reject(error);
      } else {
        fs.renameSync(cssDir + 'app.css', cssDir + outputFileName);
        resolve(cssDir);
      }
    });
  });
};

module.exports = Compass;

var compile    = require('./compiler');
var merge      = require('lodash-node/modern/objects/merge');
var pickFiles  = require('broccoli-static-compiler');
var RSVP       = require('rsvp');
var fs         = require('fs');
var path       = require('path');

module.exports = {
  name: 'ember-cli-compass-compiler',
  included: function(app) {
    this._super.included.apply(this, arguments);
    var projectName = this.project.name();

    app.registry.add('css', {
      name: 'ember-cli-compass-compiler',
      ext: ['scss', 'sass'],
      toTree: function(tree, inputPath, outputPath) {
        if (inputPath[0] === '/') {
          inputPath = inputPath.slice(1);
        }

        if (outputPath[0] === '/') {
          outputPath = outputPath.slice(1);
        }

        var options = app.options.compassOptions || {};
        var defaultOptions = {
          sassDir: inputPath,
          cssDir: outputPath,
          importPath: '.',
          files: [inputPath + '/app.scss'],
          outputStyle: 'compressed',
          compassCommand: 'compass'
        };

        var compassOptions = merge(defaultOptions, options);
        var compiledTree = compile(tree, compassOptions);
        return {
          read: function(readTree) {
            return readTree(compiledTree).then(function(srcDir) {
              return new RSVP.Promise(function (resolve, reject) {
                var srcPath = path.join(srcDir, 'assets', 'app.css');
                var destPath = path.join(srcDir, 'assets', projectName + '.css');
                fs.rename(srcPath, destPath, function(err) {
                  if (err) {
                    reject(err);
                  }
                  resolve(srcDir);
                })
              });
            });
          },
          cleanup: function() {
            if (typeof compiledTree.cleanup === 'function') {
              return compiledTree.cleanup();
            }
          }
        }
      }
    });
  }
};

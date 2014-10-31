var compile       = require('./compiler');
var merge         = require('lodash-node/modern/objects/merge');
var mergeTrees    = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-compass-compiler',
  included: function(app) {
    this._super.included.apply(this, arguments);
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
          outputStyle: 'compressed',
          compassCommand: 'compass',
          importPath: []
        };

        var compassOptions = merge(defaultOptions, options);

        var treesToWatch = compassOptions.importPath.map(function (path) {
          var relativePath = path.replace(process.cwd() + '/', '');
          return relativePath;
        })
        treesToWatch.unshift(inputPath);
        var merged = mergeTrees(treesToWatch, { overwrite: true });
        return compile(merged, compassOptions);
      }
    });
  }
};

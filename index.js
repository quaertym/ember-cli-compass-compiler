'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLICompassCompiler(project) {
  this.project = project;
  this.name    = 'Ember CLI Compass Compiler';
}

module.exports = EmberCLICompassCompiler;
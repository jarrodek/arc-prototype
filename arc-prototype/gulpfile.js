'use strict';

var gulp = require('gulp');
var hyd = require('hydrolysis');

// Load custom tasks from the `tasks` directory
try {
  require('require-dir')('tasks');
} catch (err) {}

// tasks to be prformed when bower is updated.
gulp.task('bower-update', (done) => {
  var bu = require('./tasks/bower-update.js');
  bu.postInstall()
    .then(() => {
      console.log('Project builded after bower update.');
      done();
    })
    .catch((e) => {
      console.log('unable to build project after bower update.');
      done(e);
    });
});

gulp.task('analyse', (done) => {
  hyd.Analyzer.analyze('app/index.html')
    .then(function(analyzer) {
      let list = Object.getOwnPropertyNames(analyzer.loader.requests);
      // console.log(analyzer.loader);
      console.log(list);
      done();
    });
});

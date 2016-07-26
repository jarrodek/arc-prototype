'use strict';

var gulp = require('gulp');

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

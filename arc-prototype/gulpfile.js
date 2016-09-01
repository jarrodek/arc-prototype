'use strict';

const gulp = require('gulp');
const hyd = require('hydrolysis');
const fs = require('fs');
const del = require('del');

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
      list.sort();
      // console.log(analyzer.loader);
      // console.log(list);
      fs.writeFile('components.json', JSON.stringify(list, null, 2), (err) => {
        if (err) {
          throw err;
        }
        console.log('It\'s saved!');
        done();
      });
    });
});

const checkDirectory = (dir, usedElements) => {
  // get dir names
  var filesUsed = [];
  usedElements.forEach((item) => {
    filesUsed.push(item.split('/')[0]);
  });
  // console.log(filesUsed);
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      // Now have existing `files` in the dire and `filesUsed` that should not be removed.
      let rem = files.filter((item) => filesUsed.indexOf(item) === -1);
      resolve(rem);
    });
  });
};

const cleanup = (dirs) => {
  return del(dirs).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
};

gulp.task('check-dependencies', ['analyse'], (done) => {
  fs.readFile('components.json', (err, data) => {
    if (err) {
      throw err;
    }
    data = JSON.parse(data);
    let elements = [];
    data.forEach((item) => {
      let i = item.indexOf('app/elements/');
      if (i === 0) {
        elements.push(item.substr(13));
      }
    });
    checkDirectory('app/elements', elements)
      .then((toRemove) => {
        toRemove = toRemove.map((item) => 'app/elements/' + item);
        cleanup(toRemove);
        done();
      });

  });
});

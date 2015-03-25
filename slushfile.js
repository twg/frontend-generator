/*
 * slush-twg
 * https://github.com/themarkappleby/slush-twg
 *
 * Copyright (c) 2015, Mark Appleby
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var defaults = getDefaults();

var questions = [
  {
    name: 'appName',
    message: 'What is the name of your project?',
    default: defaults.appName
  },
  {
    name: 'appDescription',
    message: 'How would you describe your project?',
    default: 'Client Node application'
  },
  {
    name: 'appDependencies',
    message: 'Select dependencies:',
    type: 'checkbox',
    choices: [
      {
        name: 'TWG Front-end Scaffolding',
        checked: true,
        value: {
          'twg-frontend-scaffolding':'latest',
          'styles': ['bower_components/twg-frontend-scaffolding/dist/_scaffolding.styl']
        }
      },
      {
        name: 'AngularJS',
        checked: true,
        value: {
          'angular':'latest',
          'scripts': ['bower_components/angular/angular.js']
        }
      },
      {
        name: 'Animate.css',
        checked: true,
        value: {
          'animate.css':'latest',
          'styles': 'bower_components/animate.css/animate.css'
        }
      }
    ]
  }
];

// -------------------------------------

var gulp = require('gulp');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var _ = require('underscore.string');
var inquirer = require('inquirer');

function format(string) {
  var username = string.toLowerCase();
  return username.replace(/\s/g, '');
}

function getDefaults(){
  var workingDirName = path.basename(process.cwd()),
  homeDir, osUserName, configFile, user;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
  }
  else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
    osUserName = homeDir && homeDir.split('/').pop() || 'root';
  }

  configFile = path.join(homeDir, '.gitconfig');
  user = {};

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user;
  }

  return {
    appName: workingDirName,
    userName: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || ''
  };
}

function parseDependencies(rawDependencies){
  var dependencies = {};
  var dependencyStyles = [];
  var dependencyScripts = [];

  for(var i=0; i<rawDependencies.length; i++){
    var rawDependency = rawDependencies[i];
    for(var k in rawDependency){
      if(k === 'styles'){
        dependencyStyles = appendDependencies(dependencyStyles, rawDependency[k]);
      }
      else if(k === 'scripts'){
        dependencyScripts = appendDependencies(dependencyScripts, rawDependency[k]);
      }
      else{
        dependencies[k] = rawDependency[k];
      }
    }
  }
  return {
    names: dependencies,
    styles: dependencyStyles,
    scripts: dependencyScripts
  };
}

function appendDependencies(dependencies, newItems){
  if(newItems.constructor === Array){
    for(var i=0; i<newItems.length; i++){
      dependencies.push(newItems[i]);
    }
  }
  else{
    dependencies.push(newItems);
  }
  return dependencies;
}

gulp.task('default', function (done) {
  inquirer.prompt(questions,
    function (answers) {

      var dependencies = parseDependencies(answers.appDependencies);
      answers.appDependencies = JSON.stringify(dependencies.names, null, 2);
      answers.appDependencyStyles = JSON.stringify(dependencies.styles, null, 2);
      answers.appDependencyScripts = JSON.stringify(dependencies.scripts, null, 2);

      answers.appNameSlug = _.slugify(answers.appName);
      answers.appError = '<%= error.message %>';
      gulp.src([__dirname + '/templates/**'], {dot: true})
        .pipe(template(answers))
        .pipe(rename(function (file) {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          }
        }))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .pipe(install())
        .on('end', function () {
          done();
        });

    });
});

/*
 * slush-twg
 * https://github.com/themarkappleby/slush-twg
 *
 * Copyright (c) 2015, Mark Appleby
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    path = require('path'),
    _ = require('underscore.string'),
    inquirer = require('inquirer');

function format(string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
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
})();

gulp.task('default', function (done) {
    var prompts = [
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
        name: 'appIncludes',
        message: 'Select includes:',
        type: 'checkbox',
        choices: [
          {
            name: 'TWG Frontend Scaffolding',
            value: 'scaffolding',
            checked: true
          },
          {
            name: 'AngularJS',
            value: 'angular',
            checked: true
          }
        ]

      }
    ];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
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

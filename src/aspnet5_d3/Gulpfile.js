/// <binding AfterBuild='typescript, bower' ProjectOpened='bower' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest('wwwroot/js/'));
});

gulp.task('typescript', function () {
    return gulp.src(['js/**/*.js'])
        .pipe(gulp.dest('wwwroot/js'));
});
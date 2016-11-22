'use strict';

var gulp              = require('gulp'),
    sass              = require('gulp-sass'),
    autoprefixer      = require('gulp-autoprefixer'),
    cleanCSS          = require('gulp-clean-css'),
    watch             = require('gulp-watch'),
    sourcemaps        = require('gulp-sourcemaps'),
    browserSync       = require('browser-sync').create(),
    mainBowerFiles    = require('main-bower-files'),
    imagemin          = require('gulp-imagemin'),
    fontmin           = require('gulp-fontmin'),
    flatten           = require('gulp-flatten'),
    twig              = require('gulp-twig'),
    data              = require('gulp-data'),
    path              = require('path'),
    fs                = require('fs'),
    JSON5             = require('json5'),
    _                 = require('lodash');
            //sass
gulp.task('sass', function () {
    return gulp.src('./frontend/stylesheets/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

            //browser-sync
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch('./frontend/stylesheets/**/*.scss', ['sass']);
    gulp.watch('./views/**/*.twig', ['twig']);
    gulp.watch("./public/*.html").on('change', browserSync.reload);
    gulp.watch("./public/**/*.js").on('change', browserSync.reload);
});
            //font: watch/build/
gulp.task('font:watch', ['font:build'], function () {
    return watch('./frontend/fonts/**/*.ttf', function () {
        gulp.src('./frontend/fonts/**/*.ttf')
            .pipe(fontmin())
            .pipe(gulp.dest('./public/fonts'));
    });
});

gulp.task('font:build', function () {
    gulp.src('./frontend/fonts/**/*.ttf')
        .pipe(fontmin())
        .pipe(gulp.dest('./public/fonts'));
});
            //image: watch/build/min
gulp.task('image:watch', ['image:build'], function () {
    return watch(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'], function () {
        gulp.src(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'])
            .pipe(imagemin())
            .pipe(gulp.dest('./public/images'));
    });
});

gulp.task('image:build', function () {
    gulp.src(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'])
            .pipe(imagemin())
            .pipe(gulp.dest('./public/images'));
});
            //js: watch/build
gulp.task('js:watch', ['js:build'], function () {
    return watch('./frontend/javascript/**/*.js', function () {
        gulp.src('./frontend/javascript/**/*.js')
            .pipe(gulp.dest('./public/js'));
    });
});

gulp.task('js:build', function () {
    gulp.src('./frontend/javascript/**/*.js')
        .pipe(gulp.dest('./public/js'));
});
            //bower files: CSS
gulp.task('main-css', function () {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(gulp.dest('./public/css'));
});
            //bower files: JS
gulp.task('main-js', function () {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest('./public/js'));
});
        // twig + json

var getJsonData = function(file) {
    var fileName = path.basename(file.path, '.twig');
    var fixturesForFile = JSON5.parse(fs.readFileSync('./fixtures/' + fileName + '.json'));
    var general = JSON5.parse(fs.readFileSync('./fixtures/_.json'));
    var result = _.extend(general, fixturesForFile);
    return result;
};

gulp.task('twig', function() {

    var twig = require('gulp-twig');
    return gulp.src('./views/pages/*.twig')
        .pipe(data(getJsonData))
        .pipe(twig())
        .pipe(gulp.dest('./public'));

});


gulp.task('default', [
    'sass',
    'browser-sync',
    'twig',
    'font:watch',
    'image:watch',
    'main-css',
    'main-js',
    'js:watch']);

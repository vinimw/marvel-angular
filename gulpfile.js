'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	lib = './resources/assets/lib/';


/**
 * @description
 * Concatena arquivos JS internos do app
 */

gulp.task('concatjs', function () {
    return gulp.src([
        'resources/assets/js/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('public/assets/js'));
});


/**
 * @description
 * Concatena arquivos JS externos angular
 */

gulp.task('concatjsangular', function () {
    return gulp.src([
        lib + 'angular/angular.js',
        lib + 'angular-route/angular-route.min.js',
        lib + 'angular-md5/angular-md5.min.js',
        lib + 'angular-resource/angular-resource.min.js'
    ])
        .pipe(concat('angular.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./public/assets/js'));
});


/**
 * @description
 * Concatena arquivos JS externos
 */

gulp.task('concatjsvendors', function () {
    return gulp.src([
    	lib + 'jquery/dist/jquery.min.js',
    	lib + 'popper.js/dist/umd/popper.min.js',
        lib + 'bootstrap/dist/js/bootstrap.min.js'

    ])
        .pipe(concat('vendors.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./public/assets/js'));
});


/**
 * @description
 * Concatena arquivos CSS externos
 */

gulp.task('concatcssvendors', function () {
    return gulp.src([
        lib + 'bootstrap/dist/css/bootstrap.min.css'
    ])
        .pipe(concat('vendors.css'))
        .pipe(gulp.dest('./public/assets/css'));
});


/**
 * @description
 * Watch de todos os arquivos JS internos do app
 */

gulp.task('watch', function () {
    gulp.watch('./resources/assets/js/**/*.js', ['concatjs']);
    // gulp.watch('./resources/assets/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['concatjsangular','concatcssvendors','concatjsvendors','concatjs']);
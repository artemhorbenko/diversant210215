'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  del = require('del'),
	  pug = require('gulp-pug'),
	  newer = require('gulp-newer'),
	  notify = require('gulp-notify'),
	  plumber = require('gulp-plumber'),
	  browserSync = require('browser-sync').create(),
	  concat = require('gulp-concat'),
	  merge = require('merge-stream');

gulp.task('styles', function(){
  var sassStream, cssStream;
  sassStream = gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
    .pipe(sass())
  cssStream = gulp.src('source/assets/grid.css');
  return merge(sassStream, cssStream)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('public'));
});
gulp.task('sass', function () {
  return gulp.src('source/sass/*.sass')
  	.pipe(plumber({
  		errorHandler: notify.onError(function(err){
	    	return {
	    		title: 'Sass',
	    		message: err.message
	    	};
	    })
  	}))
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public'));
});
gulp.task('pug', function() {
  return gulp.src('source/*.pug')
  	.pipe(plumber({
  		errorHandler: notify.onError(function(err){
	    	return {
	    		title: 'Pug',
	    		message: err.message
	    	};
	    })
  	}))
    .pipe(pug())
    .pipe(gulp.dest('public'));
});
gulp.task('scripts', function(){
	return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/node_modules/tether/dist/js/tether.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/slick-carousel/slick/slick.min.js', 'source/*.js'])
	.pipe(concat('main.js'))
	.pipe(gulp.dest('public'));
});
gulp.task('assets', function() {
	return gulp.src('source/assets/**/*.*', {since: gulp.lastRun('assets')})
		.pipe(newer('public'))
		.pipe(gulp.dest('public'));
});
gulp.task('clean', function() {
	return del('public');
});
gulp.task('build', 
	gulp.series('clean', 
		gulp.parallel('sass', 'assets', 'pug', 'scripts', 'styles')
	)
);
gulp.task('watch', function () {
	gulp.watch('source/sass/**/*.sass', gulp.series('sass'));
	gulp.watch('source/assets/**/*.*', gulp.series('assets'));
	gulp.watch('source/**/*.pug', gulp.series('pug'));
	gulp.watch('source/**/*.js', gulp.series('scripts'));
});
gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));
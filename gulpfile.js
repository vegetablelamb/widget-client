var gulp = require('gulp');  
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-cssnano');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var neat = require('node-neat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('js', function() {
	return gulp.src(['./app/js/*.js'], ['!./app/js/concat.js'])
	.pipe(concat('concat.js'))
	.pipe(gulp.dest('./app/js'))
});

gulp.task('sass', function () {  
	gulp.src('./app/scss/*.scss')
	.pipe(plumber())
	.pipe(sass({
		includePaths: ['scss'].concat(neat)
	}))
	.pipe(gulp.dest('./app/scss/tmp'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('./app/css'))
});

gulp.task('reload', function () {
	browserSync.reload();
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	});
});

gulp.task('default', ['js', 'sass', 'browser-sync'], function () {
	gulp.watch(['./app/css/*.css'], ['reload'])
	gulp.watch(['./app/scss/*.scss', 'scss/**/*.scss'], ['sass'])
	gulp.watch(['./app/js/*'], ['js'], ['reload'])
	gulp.watch(['./app/*.html'], ['reload']);
});

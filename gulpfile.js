//* Variables and npm installs 

var gulp = require('gulp'),
jade = require('gulp-jade'),
sass = require('gulp-sass'),
concat = require('gulp-concat'),
browserSync = require('browser-sync'),
plumber = require('gulp-plumber'),
reload = browserSync.reload;

//* Gulp tasks for different properties x *//
		gulp.task('browser-sync', function(){
			browserSync({

				server: {
					baseDir: '_site'
				}
			});
		});
	

		gulp.task('jade', function(){
				return gulp.src('src/views/*.jade')
				.pipe(plumber())
				.pipe(jade())
				.pipe(plumber.stop())
				.pipe(gulp.dest('_site'))
				.pipe(reload({stream:true}))
			});

		gulp.task('sass', function(){
				return gulp.src('src/scss/**/*.scss')
				.pipe(plumber())
				.pipe(sass())
				.pipe(plumber.stop())
				.pipe(gulp.dest('_site/assets/css/'))
				.pipe(reload({stream:true}))
			});

		gulp.task('script', function() {
			return gulp.src('src/js/*.js')
			.pipe(plumber())
			.pipe(concat('script.js'))
			.pipe(plumber.stop())
			.pipe(gulp.dest('_site/assets/js/'))
		
		});


		gulp.task('watch', function() {

				gulp.watch('src/views/**/*.jade', ['jade'])
				gulp.watch('src/scss/**/*.scss', ['sass'])
				gulp.watch('src/js/*.js', ['script'])

			});

		gulp.task('default', ['browser-sync', 'jade', 'sass','script', 'watch'], function() {

			});
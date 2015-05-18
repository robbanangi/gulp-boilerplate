// Npm installs and properties //

var gulp = require('gulp'),
jade = require('gulp-jade'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
plumber = require('gulp-plumber'),
concat = require('gulp-concat'),
imagemin = require('gulp-imagemin'),
reload = browserSync.reload,
uglify = require('gulp-uglify');


// Gulp tasks for our Npm installs and properties! //


		gulp.task('browser-sync', function() {
    			browserSync ({
        				server: {
            		baseDir: "_site"
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


		gulp.task('concat', function(){
				return gulp.src('src/js/*.js')
				.pipe(concat('script.js'))
				.pipe(uglify())
				.pipe(gulp.dest('_site/assets/js/'))
		});

		gulp.task('watch', function() {
				gulp.watch('src/views/*.jade', ['jade'])
				gulp.watch('src/scss/**/*.scss', ['sass'])
				gulp.watch('src/js/*.js', ['concat'])
		});

		gulp.task('default', ['jade', 'sass', 'concat', 'watch', 'browser-sync'], function(){

		});
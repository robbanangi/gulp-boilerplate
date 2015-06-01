var gulp = require('gulp'),
jade = require('gulp-jade'),
sass = require('gulp-sass'),
browserSync = require('browser-sync'),
reload = browserSync.reload;
imagemin = require('gulp-imagemin'),
concat = require('gulp-concat'),
plumber = require('gulp-plumber');


	gulp.task('browser-sync', function(){
		browserSync({
				server: {
					baseDir: "_site"
				}
		});
	});

	gulp.task('jade', function(){
		return gulp.src('src/views/*.jade')
		.pipe(plumber())
		.pipe(jade())
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

		gulp.task('imagemin', function(){
			return gulp.src(['src/img/*.{png,jpg,gif}'])
			.pipe(imagemin({
				optimizationLevel: 2,
				progressive:true,
				interlaced: true
			}))
			.pipe(gulp.dest('_site/assets/img/'))
		});

		gulp.task('concat', function(){
			return gulp.src('src/js/*.js')
			.pipe(concat('script.js'))
			.pipe(gulp.dest('_site/assets/js/'))
		});


		gulp.task('watch', function(){
			gulp.watch('src/views/*.jade', ['jade'])
			gulp.watch('src/scss/**/*.scss', ['sass'])
			gulp.watch('src/js/*.js', ['concat'])

			});

		gulp.task('default', ['browser-sync', 'jade', 'sass', 'imagemin', 'concat', 'watch'], function(){});
var config = {
     sassPath: './_source/sass',
     bowerDir: './bower_components', 
}
// 引入 gulp
var gulp = require('gulp');
// 引入组件

//css plugins
//var sass = require('gulp-sass');
var sass = require('gulp-ruby-sass'); 
var compass = require('gulp-for-compass');
var minifyCSS = require('gulp-minify-css');
var combineMediaQueries = require('gulp-combine-media-queries');
var autoprefixer = require('gulp-autoprefixer');

//js plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

// Image plugins
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
//var svgmin = require('gulp-svgmin');
var svgSymbols = require('gulp-svg-symbols');

//liveload
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// General plugins
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var base64 = require('gulp-base64');
var bower = require('gulp-bower');

// error function for plumber
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
  'ios >= 6',
  'android >= 2.3',
  'bb >= 10'
];
// 编译Compass
gulp.task('css', function() {
    return gulp.src('./_source/*/*.scss')
        .pipe(plumber({ errorHandler: onError }))
        //compile sass
        .pipe(compass(
          {
            sassDir: config.sassPath,
            cssDir: 'css',
            imagesDir: 'images',
            environment: 'dev',
            relativeAssets: true,
            sourcemap: true,
            force: true,
            outputStyle: 'compact'
          }
        ))
        // Compile Sass
        //.pipe(sass({ style: 'compressed', noCache: true }))
        // Combine media queries
        .pipe(combineMediaQueries())
        // parse CSS and add vendor-prefixed CSS properties
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('./css/'))
        .pipe(base64({ extensions:['svg'] }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./css/'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('js', function() {
    return gulp.src('./_source/js/*.js')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        //.pipe(jshint())
        .pipe(gulp.dest('./js/'))
});

// Image tasks
gulp.task('images', function() {
      return gulp.src('./images/*')
        .pipe(imagemin({
          progressive: true,
          interlaced: true,
          svgoPlugins: [{removeViewBox: false},{removeUselessStrokeAndFill: false}],
          use: [pngquant()]
        }))
        // Where to store the finalized images
        .pipe(gulp.dest('./images/'))
        // Notify us that the task was completed
        .pipe(notify({ message: 'Image task complete' }));
});

// svg symbols generator
gulp.task('svggen', function () {
  return gulp.src('./images/svg/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest('./images/'))
    .pipe(notify({ message: 'svg symbols task complete' }));
});


// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
      ui:false
      ,
      host:'10.33.19.125',
      //proxy: '10.211.55.7'
      //使用代理gb2312页面乱码
      //,
      open: 'local'
    });
});
//gulp.task('browser-sync', function() {
    //browserSync({
        //dev: {
            //bsFiles: {
                //src : [
                    //'./css/**/*.css',
                    //'./images/**/*.jpg',
                    //'./images/**/*.png',
                    //'./js/**/*.js',
                    //'./**/*.php',
                    //'./**/*.html',
                    //'./**/*.htm'
                //]
            //},
            //options: {
                //watchTask: true,
                //debugInfo: true,
                //host : "10.211.55.7",
                ////port : '88',
                //ghostMode: {
                    //clicks: true,
                    //scroll: true,
                    //links: true,
                    //forms: true
                //}
            //}
        //}
    //})
//});

// Watch files for changes
gulp.task('watch', function() {
    // Watch HTML files
    gulp.watch(['*.htm','*.php'], reload);
    // Watch Sass files
    gulp.watch('_source/**/*.scss', ['css',reload]);
    // Watch JS files
    gulp.watch('_source/**/*.js', ['js',reload]);
    // Watch image files
});

// 默认任务
gulp.task('default', ['css','js','images','svggen','watch','browser-sync']);

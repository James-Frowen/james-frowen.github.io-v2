const gulp = require('gulp');
const sass = require('gulp-sass');
// const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

const masterFile = './_css/all.scss'
const watchDir = './_css/**/*.scss'
const outDir = './assets/css/';
// const outFileName = 'all.css';

function Run() {
  return gulp.src(masterFile)
    .pipe(sourcemaps.init())
    .pipe(sass({ /*outputStyle: 'compressed'*/ }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    // .pipe(cleanCSS())
    .pipe(gulp.dest(outDir));
}

function Watch() {
  gulp.watch(watchDir, Run);
}


exports.Run = Run;
exports.Watch = Watch;
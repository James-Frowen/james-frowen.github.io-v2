const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const inDir = './_css/**/*.css'
const outDir = './assets/css/';
const outFileName = 'all.css';

function Run() {
  return gulp.src(inDir)
    .pipe(concat(outFileName))
    .pipe(cleanCSS())
    .pipe(gulp.dest(outDir));
}

function Watch() {
  gulp.watch(inDir, Run);
}


exports.Run = Run;
exports.Watch = Watch;
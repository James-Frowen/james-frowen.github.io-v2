const gulp = require('gulp');
const ts = require("gulp-typescript");
const tsconfig = require('../tsconfig.json');
const gap = require('gulp-append-prepend');
const jsDir = './assets/scripts';
const tsDir = './_ts_src/**/*.ts';
const YAMLBlock = "---\n---\n";

function Run() {
  return gulp.src(tsDir)
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(gap.prependText(YAMLBlock))
    .pipe(gulp.dest(jsDir));
}

function Watch() {
  gulp.watch(tsDir, Run);
}

exports.Run = Run;
exports.Watch = Watch;
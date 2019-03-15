const gulp = require('gulp');
const ts = require("gulp-typescript");
const tsconfig = require('./tsconfig.json');
const gap = require('gulp-append-prepend');
const jsDir = './assets/scripts';
const tsDir = './_ts_src/**/*.ts';
const YAMLBlock = "---\n---\n";

const request = require('request');
const urlsToCheck = require('./gulpUrlsToCheck.json');
const localHost = 'http://localhost:4000';
const liveHost = 'https://james-frowen.github.io/james-frowen.github.io-v2';

function testAllUrl(host, cb) {
  var counter = urlsToCheck.length;
  var allPassed = true;
  urlsToCheck.forEach(url => {
    testUrl(host, url, (pass) => {
      if (!pass) {
        allPassed = false;
      }
      // if (pass) {
      //   logPass(url);
      // }
      counter--;
      if (counter === 0) {
        if (allPassed) {
          console.log(`all ${urlsToCheck.length} urls passed`);
        }
        cb();
      }
    });
  });

  function logPass(url) {
    if (typeof url === 'object') {
      console.log(`PASS ${url.url}`);
    }
    else {
      console.log(`PASS ${url}`);
    }
  }
}
function testUrl(host, url, cb) {
  if (typeof url === 'object') {
    testObject(host, url, cb);
  }
  else {
    request({ url: `${host}${url}`, method: "HEAD" }, (error, response, body) => {
      var pass = checkForErrors(url, error, response);
      cb(pass);
    });
  }
}
function testObject(host, obj, cb) {
  let { url, expect } = obj;

  request({ url: `${host}${url}`, method: "GET" }, (error, response, body) => {
    let pass = checkForErrors(url, error, response);
    if (!pass) { return; }

    if (!body.includes(expect)) {
      console.log(`url failed: ${url}, did not contain expected=${expect}`);
      pass = false;
    }

    cb(pass);
  });
}
function checkForErrors(url, error, response) {
  if (error) {
    console.log(`url failed: ${url}, ERROR=${error}`);
    return false;
  }
  if (response === null || response === undefined) {
    console.log(`url failed: ${url}, response is null or undefined`);
    return false;
  }
  if (response.statusCode === undefined) {
    console.log(`url failed: ${url}, statusCode is undefined`);
    return false;
  }
  var statusCode = response.statusCode;
  if (statusCode >= 400) {
    console.log(`url failed: ${url}, status code=${statusCode}`);
    return false;
  }

  return true;
}

function compile() {
  return gulp.src(tsDir)
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(gap.prependText(YAMLBlock))
    .pipe(gulp.dest(jsDir));
}

exports.default = function () {
  gulp.watch(tsDir, compile);
};

exports.testUrl = function (cb) {
  testAllUrl(localHost, cb);

}
exports.testUrlLive = function (cb) {
  testAllUrl(liveHost, cb);
}
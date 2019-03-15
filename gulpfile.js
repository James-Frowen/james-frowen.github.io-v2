const gulp = require('gulp');
const ts = require("gulp-typescript");
const tsconfig = require('./tsconfig.json');
const gap = require('gulp-append-prepend');
const jsDir = './assets/scripts';
const tsDir = './_ts_src/**/*.ts';
const YAMLBlock = "---\n---\n";

const request = require('request');
const localHost = 'http://localhost:4000';
const liveHost = 'https://james-frowen.github.io/james-frowen.github.io-v2';
const urlToCheck = [
  { url: '/posts/', expect: 'Page: 1 of' },
  { url: '/posts/page2', expect: 'Page: 2 of' },
  { url: '/posts/page3', expect: 'Page: 3 of' },
  '/projects/quantum-robot/',
  '/projects/quantum-robot/gallery',
  '/projects/led-strip/',
  '/projects/led-strip/gallery',
  '/projects/project-wolves/',
  '/projects/project-wolves/gallery',
  '/docs/',
  '/favicon.ico',
  '/feed.xml',
  '/',
  '/projects/',
  '/robots.txt',
  '/sitemap.xml',
  '/unity-tips/',
];
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

function compile() {
  return gulp.src(tsDir)
    .pipe(ts(tsconfig.compilerOptions))
    .pipe(gap.prependText(YAMLBlock))
    .pipe(gulp.dest(jsDir));
}

exports.default = function () {
  gulp.watch(tsDir, compile);
};
function testAllUrl(host, cb) {
  var counter = urlToCheck.length;
  urlToCheck.forEach(url => {
    testUrl(host, url, (pass) => {
      // if (pass) {
      //   logPass(url);
      // }
      counter--;
      if (counter === 0) {
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
exports.testUrl = function (cb) {
  testAllUrl(localHost, cb);

}
exports.testLiveUrl = function (cb) {
  testAllUrl(liveHost, cb);
}
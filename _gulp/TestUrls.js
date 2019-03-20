const request = require('request');

const localHost = 'http://localhost:4000';
const liveHost = 'https://james-frowen.github.io/james-frowen.github.io-v2';

const urlsToCheck = require('./UrlsToCheck.json');

function testAllUrl(host, cb) {
  var counter = urlsToCheck.length;
  var allPassed = true;
  urlsToCheck.forEach(url => {
    let after = (pass) => {
      if (!pass) {
        allPassed = false;
      }
      counter--;
      if (counter === 0) {
        if (allPassed) {
          console.log(`all ${urlsToCheck.length} urls passed`);
        }
        cb();
      }
    }
    if (typeof url === 'object') {
      let obj = url;
      obj.url = host + obj.url;
      testObject(obj, after);
    }
    else {
      testUrl(host + url, after);
    }
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
function testUrl(url, cb) {
  request({ url, method: "HEAD" }, (error, response, body) => {
    var pass = checkForErrors(url, error, response);
    cb(pass);
  });
}
function testObject(obj, cb) {
  let { url, expect } = obj;

  request({ url, method: "GET" }, (error, response, body) => {
    let pass = checkForErrors(url, error, response);
    if (pass && expect !== undefined) {
      if (!body.includes(expect)) {
        console.log(`url failed: ${url}, did not contain expected=${expect}`);
        pass = false;
      }
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

function TestLocal(cb) {
  testAllUrl(localHost, cb);
}
function TestLive(cb) {
  testAllUrl(liveHost, cb);
}


exports.TestLocal = TestLocal;
exports.TestLive = TestLive;
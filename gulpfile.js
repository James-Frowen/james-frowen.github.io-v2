const CompileTs = require('./_gulp/CompileTs');
const TestUrl = require('./_gulp/TestUrls');
const CompileSass = require('./_gulp/CompileSass');


exports.default = function () {
  CompileTs.Run();
  CompileSass.Run();

  CompileTs.Watch();
  CompileSass.Watch();
};

exports.testUrl = TestUrl.TestLocal;
exports.testUrlLive = TestUrl.TestLive;
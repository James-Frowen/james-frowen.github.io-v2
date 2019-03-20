const CompileTs = require('./_gulp/CompileTs');
const TestUrl = require('./_gulp/TestUrls');
const BuildCss = require('./_gulp/BuildCss');


exports.default = function () {
  CompileTs.Run();
  BuildCss.Run();

  CompileTs.Watch();
  BuildCss.Watch();
};

exports.testUrl = TestUrl.TestLocal;
exports.testUrlLive = TestUrl.TestLive;
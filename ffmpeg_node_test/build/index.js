"use strict";

var _inquirer = _interopRequireDefault(require("inquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

try {
  _inquirer["default"].prompt([{
    type: "input",
    name: "fileToConvert",
    message: "What is the path of the file you want to convert?"
  }, {
    type: "list",
    name: "outputFormat",
    message: "What format do you want to convert this to?",
    choices: ["mp4", "mov", "mkv"]
  }, {
    type: "input",
    name: "outputName",
    message: "What should the name of the file be (without format)?"
  }, {
    type: "input",
    name: "outputPath",
    message: "Where do you want to store the converted file?"
  }]).then(function (answers) {
    var fileToConvert = answers === null || answers === void 0 ? void 0 : answers.fileToConvert;
    var outputPath = answers === null || answers === void 0 ? void 0 : answers.outputPath;
    var outputName = answers === null || answers === void 0 ? void 0 : answers.outputName;
    var outputFormat = answers === null || answers === void 0 ? void 0 : answers.outputFormat; // We'll call to FFmpeg here...
  });
} catch (err) {
  console.warn(err.message);
}
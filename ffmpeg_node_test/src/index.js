import inquirer from "inquirer";
import fs from "fs";
import child_process from "child_process";

const parentPath = "C:/testVideo/test_video1.mp4";

const testVideo = "test_video1.mp4";

try {
  console.log("<<<<<<<<<<<<<<<<<<<< 영상 HLS 인코더 >>>>>>>>>>>>>>>>>>");
  inquirer
    .prompt([
      {
        type: "input",
        name: "fileToConvert",
        message: "인코딩 하고자 하는 원본 영상의 절대경로를 입력하세요.",
      },
      {
        type: "input",
        name: "outputPath",
        message: "최종 파일 저장경로를 입력하세요.",
      },
      {
        type: "input",
        name: "outputName",
        message: "결과 m3u8 파일의 파일명을 입력하세요.",
      },
    ])
    .then((answers) => {
      const { fileToConvert, outputPath, outputName } = answers;

      const outputFormat = "m3u8";

      if (!fileToConvert || (fileToConvert && !fs.existsSync(fileToConvert))) {
        console.warn("\nMust pass a video file to convert.\n");
        process.exit(0);
      }

      fs.mkdir(outputPath, (err) => {
        if (err && err.code != "EEXIST") throw "up";
        console.log("저장경로 이미 존재.");
      });

      child_process.execSync(
        `ffmpeg -i ${fileToConvert} -b:v 1M -g 60 -hls_time 2 -hls_list_size 0 -hls_allow_cache 1 ${
          outputName
            ? `${outputPath}/${outputName}.${outputFormat}`
            : `${outputPath}/video.${outputFormat}`
        }`,
        {
          stdio: Object.values({
            stdin: "inherit",
            stdout: "inherit",
            stderr: "inherit",
          }),
        }
      );
    });
} catch (err) {
  console.warn(err.message);
}

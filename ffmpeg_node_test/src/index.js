import child_process from 'child_process';
import fs from 'fs';

try {
  console.log('<<<<<<<<<<<<<<<<<<<< 영상 HLS 인코더 >>>>>>>>>>>>>>>>>>');
  // inquirer
  //   .prompt([
  //     {
  //       type: "input",
  //       name: "fileToConvert",
  //       message: "인코딩 하고자 하는 원본 영상의 절대경로를 입력하세요.",
  //     },
  //     {
  //       type: "input",
  //       name: "outputPath",
  //       message: "최종 파일 저장경로를 입력하세요.",
  //     },
  //     {
  //       type: "input",
  //       name: "outputName",
  //       message: "결과 m3u8 파일의 파일명을 입력하세요.",
  //     },
  //   ])
  //   .then((answers) => {
  // const { fileToConvert, outputPath, outputName } = answers;

  // console.log('기존 작업물 초기화 작업중');
  // fs.unlink('./converted/*', (a) => {
  // console.log('fs.rm >>> result: ', a);
  const fileName = 'Impressive.mp4';
  // const fileName = 'Hankuk.mp4';
  const fileToConvert = `./targetVideo/${fileName}`;

  const outputName = `converted_${fileName.split('.')[0]}`;
  const outputFormat = 'm3u8';
  console.log('인코딩할 대상파일 경로: ', fileToConvert);
  if (!fileToConvert || (fileToConvert && !fs.existsSync(fileToConvert))) {
    console.log(
      '!fs.existsSync(fileToConvert): ',
      !fs.existsSync(fileToConvert)
    );

    console.warn(
      `${new Array('Must pass a video file to convert.'.length)
        .fill(0)
        .map((e) => '#')
        .join('')}\nMust pass a video file to convert.\n${new Array(
        'Must pass a video file to convert.'.length
      )
        .fill(0)
        .map((e) => '#')
        .join('')}`
    );
    process.exit(0);
  }
  try {
    fs.mkdir(`./converted`, (err) => {
      if (err && err?.code !== 'EEXIST') {
        console.log('./converted err: ', err);
        if (err.code !== 'EEXIST') throw new Error('응애1');
      }
      fs.mkdir(`./converted/${fileName.split('.')[0]}`, (err) => {
        // if (err && err.code != 'EEXIST') throw 'up';
        if (err && err?.code !== 'EEXIST') {
          console.log('영상 저장경로 err: ', err);
          throw new Error('응애2');
        }
        fs.mkdir(`./converted/${fileName.split('.')[0]}/tsFiles`, (err) => {
          if (err && err?.code !== 'EEXIST') {
            console.log('세그먼트 저장경로 err:', err);
            if (err.code !== 'EEXIST') throw new Error('응애3');
          } else {
            child_process.execSync(
              `ffmpeg -i ${fileToConvert} -b:v 1M -g 60 -hls_time 10 -hls_list_size 0 -hls_allow_cache 1 -hls_segment_filename './converted/${
                fileName.split('.')[0]
              }/tsFiles/ts%02d.ts' 
              -var_stream_map "name:tsFiles" 
              ./converted/${fileName.split('.')[0]}/${
                outputName
                  ? `${outputName}.${outputFormat}`
                  : `video.${outputFormat}`
              }`,
              {
                stdio: Object.values({
                  stdin: 'inherit',
                  stdout: 'inherit',
                  stderr: 'inherit',
                }),
              }
            );
          }
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
  // fs.mkdir(outputPath, (err) => {
  //   if (err && err.code != 'EEXIST') throw 'up';
  //   console.log('저장경로 이미 존재.');
  // });

  // });

  // });
} catch (err) {
  console.warn(err.message);
}

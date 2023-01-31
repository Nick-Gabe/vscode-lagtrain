import { copyFileSync, readdir, readdirSync, writeFileSync } from "fs";

const timer = (sec: number) => {
  let secondsTillStart = sec;
  let interval = setInterval(() => {
    const timerPhrase = `Video will start in ${secondsTillStart} seconds`;

    console.clear();
    console.log(timerPhrase);

    writeFileSync("render-result.txt", timerPhrase, { encoding: "utf-8" });
    secondsTillStart--;

    if (secondsTillStart === 0) clearInterval(interval);
  }, 1000);
};

type Options = {
  fps: number;
  scale: number;
  palette: string;
  timer: boolean;
};

export const generateVideo = (path: string, options: Options) => {
  const secondsTillStart = options.timer ? 10 : 0;
  if (options.timer) timer(secondsTillStart);

  const frames = readdirSync(path).filter(x => x.endsWith(".txt"));
  const fpsDelay = 1000 / options.fps;
  let curFrame = 1;
  let interval: NodeJS.Timer;

  setTimeout(() => {
    interval = setInterval(() => {
      if (curFrame === frames.length) {
        clearInterval(interval);
        console.clear();
        console.log("✅ Video finished playing");
        return;
      }
      const inputPath = `${path}/frame-${curFrame}.txt`;
      const outputPath = "./render-result.txt";

      copyFileSync(inputPath, outputPath);
      curFrame++;
    }, fpsDelay);
  }, secondsTillStart * 1000);

  // frames.forEach(frame => {
  //   const imageInputPath = `${path}/frame-${frame}.jpg`;
  //   const frameOutputPath = `${path}/frame-${frame}.txt`;

  //   getImagePixels(imageInputPath, options.scale, pixels => {
  //     imageToAscii(frameOutputPath, pixels, options.palette);
  //   });
  // });
};

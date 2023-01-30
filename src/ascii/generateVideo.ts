import { readdirSync, writeFileSync } from "fs";
import { getImagePixels } from "./getImagePixels";
import { imageToAscii } from "./imageToAscii";
import { ParamsObject } from "../params";

const timer = (sec: number) => {
  let secondsTillStart = sec;
  let interval = setInterval(() => {
    const timerPhrase = `Video will start in ${secondsTillStart} seconds`
    
    console.clear();
    console.log(timerPhrase);

    writeFileSync(
      "render-result.txt",
      timerPhrase,
      { encoding: "utf-8" }
    );
    secondsTillStart--;

    if (secondsTillStart === 0) clearInterval(interval);
  }, 1000);
};

type Options = {
  fps: number;
  scale: number;
  palette: string;
}

export const generateVideo = (
  path: string,
  options: Options,
  includeTimer: boolean
) => {
  const secondsTillStart = includeTimer ? 10 : 0;
  if (includeTimer) timer(secondsTillStart);
  path += "/";

  const frames = readdirSync(path);
  const fpsDelay = 1 / options.fps;

  const renderImage = (frame = 0) => {
    if (frame > frames.length) return;
    frame++;
    setTimeout(() => {
      getImagePixels(`${path}frame-${frame}.jpg`, options.scale, pixels => {
        imageToAscii(pixels, options.palette, () => renderImage(frame));
      });
    }, fpsDelay * 1000);
  };

  setTimeout(() => {
    renderImage();
  }, secondsTillStart * 1000);
};

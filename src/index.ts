import { generateVideo } from "./ascii/generateVideo";
import { extractFrames } from "./extractFrames";
import { verifyParams } from "./params";

const paramsPassed = verifyParams();

(async function videoToAscii() {
  if (paramsPassed) {
    const fps = Number(paramsPassed.fps) || 15;
    const scale = Number(paramsPassed.scale) || 0.3;
    const palette = paramsPassed.palette || 'default';
    const timer = Boolean(paramsPassed.timer) || true;

    await extractFrames({
      src: `./assets/${paramsPassed.src}`,
      scale,
      fps,
      callback: dir => {
        generateVideo(dir, {
          fps, scale, palette
        }, timer);
      },
    });
  }
})();

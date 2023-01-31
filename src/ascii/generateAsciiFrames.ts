import { readdirSync } from "fs";
import { getImagePixels } from "./getImagePixels";
import { imageToAscii } from "./imageToAscii";
import { watchFrameLoading } from "../extractFrames/loading";
import { generateVideo } from "./generateVideo";

type Options = {
  fps: number;
  scale: number;
  palette: string;
  timer: boolean;
};

export const generateAsciiFrames = (path: string, options: Options) => {
  const next = () => generateVideo(path, options);

  const imageFrames = readdirSync(path).filter(x => x.endsWith(".jpg"));
  const textFrames = readdirSync(path).filter(x => x.endsWith(".txt"));

  if (imageFrames.length === textFrames.length) return next();

  watchFrameLoading(
    () => readdirSync(path).filter(x => x.endsWith(".txt")).length,
    readdirSync(path).filter(x => x.endsWith(".jpg")).length,
    {
      loading: "Generating ASCII frames",
      success: "✅ ASCII frames generated!",
    }
  );

  const generateImage = (frame: number = 1) => {
    if (frame === imageFrames.length) return next();

    const imageInputPath = `${path}/frame-${frame}.jpg`;
    const frameOutputPath = `${path}/frame-${frame}.txt`;

    console.log("🥿", imageInputPath, frameOutputPath);

    getImagePixels(imageInputPath, options.scale, pixels => {
      imageToAscii(frameOutputPath, pixels, options.palette, () =>
        generateImage(++frame)
      );
    });
  };

  generateImage();
};

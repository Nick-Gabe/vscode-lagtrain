import { readdirSync } from "fs";
import { getImagePixels } from "./getImagePixels";
import { imageToAscii } from "./imageToAscii";
import { generateVideo } from "./generateVideo";
import { printFrameLoading } from "../extractFrames/loading";

type Options = {
  fps: number;
  scale: number;
  palette: string;
  timer: boolean;
};

export const generateAsciiFrames = (path: string, options: Options) => {
  const startVideo = () => generateVideo(path, options);

  const imageFrames = readdirSync(path).filter((x) => x.endsWith(".jpg"));
  const textFrames = readdirSync(path).filter((x) => x.endsWith(".txt"));

  if (imageFrames.length === textFrames.length) return startVideo();

  printFrameLoading(
    () => readdirSync(path).filter((x) => x.endsWith(".txt")).length,
    readdirSync(path).filter((x) => x.endsWith(".jpg")).length,
    {
      loading: "Generating ASCII frames",
      success: "✅ ASCII frames generated!",
    }
  );

  const generateImage = (frame: number = 1): unknown => {
    if (frame > imageFrames.length) return startVideo();

    const frameStr = `frame-${frame}`;
    const imageInputPath = `${path}/${frameStr}.jpg`;
    const frameOutputPath = `${path}/${frameStr}.txt`;

    if (textFrames.includes(`${frameStr}.txt`)) return generateImage(++frame);

    getImagePixels(imageInputPath, options.scale, (pixels) => {
      imageToAscii(frameOutputPath, pixels, options.palette, () =>
        generateImage(++frame)
      );
    });
  };

  generateImage();
};

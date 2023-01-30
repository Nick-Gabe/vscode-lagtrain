import ffmpegExtractFrames from "ffmpeg-extract-frames";
import { mkdirSync, readdirSync } from "fs";
import fsExtra from "fs-extra";
import getVideoDurationInSeconds from "get-video-duration";
import { watchFrameLoading } from "./loading";
// import { rescaleFrames } from "./rescaleFrames";

type Params = {
  src: string;
  fps: number;
  scale: number;
  callback: (dir: string) => unknown;
};

export const extractFrames = async (params: Params) => {
  const { src, fps } = params;

  // Creates frame folder
  const videoName = src.match(/(?<=assets\/).*(?=.mp4)/)?.[0];
  const outputDir = "./dist/frames/" + videoName;
  mkdirSync(outputDir, { recursive: true });
  const folder = readdirSync(outputDir);

  const videoDuration = Math.floor(await getVideoDurationInSeconds(src));
  const videoMaxFrames = videoDuration * fps;
  if (folder.length === videoMaxFrames) return params.callback(outputDir);
  else if (folder.length !== 0) {
    fsExtra.emptyDirSync(outputDir);
  }

  const filePath = `${outputDir}/frame-%d.jpg`;

  watchFrameLoading(() => readdirSync(outputDir).length, videoMaxFrames, {
    success: "✅ Frames extracted successfully",
    loading: "Extracting Video Frames",
  });

  await ffmpegExtractFrames({
    input: src,
    output: filePath,
    fps,
  });

  // rescaleFrames(outputDir, params.scale, 
    params.callback(outputDir)
    // );
};

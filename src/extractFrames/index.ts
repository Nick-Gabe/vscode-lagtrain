import ffmpegExtractFrames from "ffmpeg-extract-frames";
import { mkdirSync, readdirSync, writeFileSync } from "fs";
import fsExtra from "fs-extra";
import getVideoDurationInSeconds from "get-video-duration";
import { watchFrameLoading } from "./loading";

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
  const folder = readdirSync(outputDir).filter(x => x.endsWith(".jpg"));

  const videoDuration = Math.floor(await getVideoDurationInSeconds(src));
  const videoMaxFrames = videoDuration * fps;

  const infoFile = await import(`../../${outputDir}/_info.json`).catch(x => x);
  if (infoFile?.fps == fps) {
    const differentFrameQuantity = folder.length - videoMaxFrames;

    if (differentFrameQuantity > 0 && differentFrameQuantity < 20) {
      return params.callback(outputDir);
    }
  }

  if (folder.length !== 0) {
    fsExtra.emptyDirSync(outputDir);
  }

  // stores command info
  const cachedInfo = {
    fps,
  };
  writeFileSync(outputDir + "/_info.json", JSON.stringify(cachedInfo), {
    encoding: "utf-8",
  });

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

  params.callback(outputDir);
};

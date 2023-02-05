import ffmpegExtractFrames from "ffmpeg-extract-frames";
import { mkdirSync, readdirSync, writeFileSync } from "fs";
import fsExtra from "fs-extra";
import getVideoDurationInSeconds from "get-video-duration";
import { printFrameLoading } from "./loading";

type Params = {
  src: string;
  fps: number;
  scale: number;
  palette: string;
  callback: (dir: string) => unknown;
};

export const extractFrames = async (params: Params) => {
  const { src, fps, scale, palette } = params;

  // Creates frame folder
  const videoName = src.match(/(?<=assets\/).*(?=.mp4)/)?.[0];
  const outputDir = "./dist/frames/" + videoName;
  mkdirSync(outputDir, { recursive: true });
  const folder = readdirSync(outputDir).filter((x) => x.endsWith(".jpg"));

  const videoDuration = Math.floor(await getVideoDurationInSeconds(src));
  const videoMaxFrames = videoDuration * fps;

  const infoFile = await import(`../../${outputDir}/_info.json`).catch(
    (x) => x
  );

  const infoFileEntries = Object.entries(infoFile?.default || {});
  const paramEntries = Object.entries(params);

  const compareStoredInfo = ([key, val]: [string, unknown]) => {
    const correspondingParam = paramEntries.find(param => param[0] === key);

    return val == correspondingParam?.[1]
  }

  if (infoFileEntries.every(compareStoredInfo)) {
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
    scale,
    palette
  };
  writeFileSync(outputDir + "/_info.json", JSON.stringify(cachedInfo), {
    encoding: "utf-8",
  });

  const filePath = `${outputDir}/frame-%d.jpg`;

  printFrameLoading(() => readdirSync(outputDir).length, videoMaxFrames, {
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

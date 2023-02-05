declare module "ffmpeg-extract-frames" {
  declare type Options = {
    input: string,
    output: string,
    log?: Function,
    timestamps?: (number | string)[],
    offsets?: number[],
    fps?: number,
    numFrames?: number,
    ffmpegPath?: string
 } 
 export default async (options: Options) => {}
}

declare module "fs-extra" {
  export = {
    emptyDirSync(dir: string): void
  }
}

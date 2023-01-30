import { readdirSync } from "fs";
import Jimp from "jimp";
import { printFrameLoading } from "./loading";

// This function was going to be used to rescale frames only once, when creating the video frames
// However it is causing some bugs related to time spent

export const rescaleFrames = async (path: string, scale: number, callback: Function) => {
  const files = readdirSync(path);

  for(let i = 0; i < files.length; i++) {
    const file = files[i];
    printFrameLoading(i, files.length - 1, {
      success: '✅ Finished resizing frames',
      loading: 'Resizing frames'
    });
  
    const filePath = `${path}/${file}`;
    Jimp.read(filePath, (err, img) => {
      img.scale(scale);
      img.write(filePath);
      return img
    });

    if(i === files.length - 1) callback(path);
  }

};

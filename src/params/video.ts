import { readFileSync } from "fs";

export const videoParam = (params: string[]) => {
  const videoParam = params[0];

  if (!videoParam) {
    console.error(`
      \r❌ You forgot to mention the video you want to run
      \r(It must be inside ./assets | e.g. lagtrain.mp4)
    `);
    return false;
  }

  if(!videoParam.endsWith('.mp4')) {
    console.error(`
      \r❌ The only video extension currently accepted is mp4
    `);
    return false;
  }

  try {
    readFileSync("./assets/" + videoParam);
  } catch (err) {
    console.error(`
      \r❌ The file provided doesn't exist inside ./assets
      \rCheck the spelling or extension of the file
    `);
    return false
  }

  return true;
};

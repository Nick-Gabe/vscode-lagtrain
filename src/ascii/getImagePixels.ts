import Jimp from 'jimp';

export type RGBA = Record<'r' | 'g' | 'b' | 'a', number>

export type Pixel = (RGBA | string)[]

export const getImagePixels = async (path: string, scale: number, callback: (pixels: Pixel) => unknown) => {
  const pixels: Pixel = [];

  await Jimp.read(path, (err, img) => {
    img.scale(scale || .3);
    const width = img.getWidth();
    const height = img.getHeight();

    for(let i = 0; i < height; i++) {
      for(let j = 0; j < width; j++) {
        const color = Jimp.intToRGBA(img.getPixelColor(j, i))
        pixels.push(color);
      }
      pixels.push('\n')
    }

    callback(pixels);
  })

  return;
}
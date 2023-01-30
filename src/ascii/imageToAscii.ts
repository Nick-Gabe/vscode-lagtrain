import { writeFileSync } from "fs";
import { Pixel } from "./getImagePixels";
import { RGBToHSL } from "../utils/rgbToHsl";
import palettes from "../../palettes.json";

const isBetween = (val: number, x: number, y: number) => val >= x && val <= y;

export const imageToAscii = (
  pixels: Pixel,
  palette: string,
  callback: Function
) => {
  const mappedPixels = pixels.map(pixel => {
    if (typeof pixel === "string") return pixel;

    const [hue, saturation, lightness] = RGBToHSL(pixel);

    type SymbolMinMax = [number, number, string];

    const allPalettes = palettes as unknown as Record<string, SymbolMinMax[]>;
    const selectedPalette = allPalettes[palette] || allPalettes.default;

    const symbol = selectedPalette.find(
      ([min, max]) => lightness >= min && lightness <= max
    );

    // if(isBetween(lightness, 62, 100)) return '⬜'
    // else return '⬛'

    return symbol?.[2];
  });

  writeFileSync("render-result.txt", mappedPixels.join(""), {
    encoding: "utf-8",
  });
  callback();
};

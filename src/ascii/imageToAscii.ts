import { writeFileSync } from "fs";
import { Pixel } from "./getImagePixels";
import { RGBToHSL } from "../utils/rgbToHsl";
import palettes from "../../palettes.json";

export const imageToAscii = (
  path: string,
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

    return symbol?.[2];
  });

  writeFileSync(path, mappedPixels.join(""), {
    encoding: "utf-8",
  });
  callback();
};

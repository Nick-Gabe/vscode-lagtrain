import { paramRegex } from "../utils/paramRegex";
import palettes from '../../palettes.json';

export const paletteParam = (params: string[]) => {
  const paletteParam = params.find(param => param.includes('--palette'));
  const param = paletteParam?.match(paramRegex('palette'));

  if (!paletteParam) return true;

  const paletteValue = param?.[1];

  if(!paletteValue) return true;

  type SymbolMinMax = [number, number, string];
  const allPalettes = palettes as unknown as Record<string, SymbolMinMax[]>;

  if(!allPalettes[paletteValue]) {
    console.error(`
      \r❌ The palette parameter is the name of a palette inside palettes.json
      \rThe palette informed was not found, consider creating it
    `);
    return false;
  }

  return true;
};

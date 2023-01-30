import { paramRegex } from "../utils/paramRegex";
import { fpsParam } from "./fps";
import { paletteParam } from "./palette";
import { scaleParam } from "./scale";
import { videoParam } from "./video";

export type ParamsObject = {
  src: string;
  fps?: string;
  size?: string;
  scale?: string;
  palette?: string;
  timer?: string;
};

export const verifyParams = () => {
  const inputParams = process.argv.slice(2);

  const params = [videoParam, fpsParam, scaleParam, paletteParam];

  const paramsPassed = params.every(param => param(inputParams));
  if (!paramsPassed) return false;

  const paramsObject: ParamsObject = inputParams.reduce(
    (acc: ParamsObject, cur) => {
      if (cur.includes(".mp4") && !acc.src) acc.src = cur;
      else if (cur.includes("--")) {
        const [key, value] = cur.match(paramRegex()) || [];

        if (key && value) acc[key as keyof ParamsObject] = value;
      }
      return acc;
    },
    {} as ParamsObject
  );

  return paramsObject;
};

import { paramRegex } from "../utils/paramRegex";

export const scaleParam = (params: string[]) => {
  const scaleParam = params.find(param => param.includes('--scale'));
  const param = scaleParam?.match(paramRegex('scale'));

  if (!scaleParam) return true;

  const scaleValue = Number(param?.[1]);

  if(!scaleValue) return true;

  if(isNaN(scaleValue) || scaleValue <= 0 || scaleValue > 1) {
    console.error(`
      \r❌ The scale parameter must be a decimal number above 0 and below 1
      \rIt will be based on the original video scale (0.5 in 1280x720 is 640x360)
    `);
    return false;
  }

  return true;
};

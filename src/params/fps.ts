import { paramRegex } from "../utils/paramRegex";

export const fpsParam = (params: string[]) => {
  const fpsParam = params.find(param => param.includes('--fps'));
  const param = fpsParam?.match(paramRegex('fps'));

  if (!fpsParam) return true;

  
  const fpsNumber = Number(param?.[1]);

  if(isNaN(fpsNumber) || fpsNumber <= 0 || fpsNumber > 60) {
    console.error(`
      \r❌ The fps parameter must be an integer above 0 and below 61
    `);
    return false;
  }

  return true;
};

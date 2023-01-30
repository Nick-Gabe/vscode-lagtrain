import { paramRegex } from "../utils/paramRegex";

export const timerParam = (params: string[]) => {
  const timerParam = params.find(param => param.includes('--timer'));
  const param = timerParam?.match(paramRegex('timer'));

  if (!timerParam) return true;

  const timerValue = param?.[1];

  if(timerValue !== 'true' && timerValue !== 'false') {
    console.error(`
      \r❌ the timer parameter should be a true or false value
    `);
    return false;
  }

  return true;
};

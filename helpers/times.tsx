import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SkiFormattedTime } from "../types";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

export const addTimes = (m1: SkiFormattedTime, m2: SkiFormattedTime) => {
  return strToMillisec(m1) + strToMillisec(m2);
};

export const strToMillisec = (time: SkiFormattedTime): number => {
  if (!time) return 0;
  const [minutes, seconds, hundredth] = time.split(".");
  return dayjs
    .duration({
      minutes: Number(minutes),
      seconds: Number(seconds),
      milliseconds: Number(hundredth) * 10,
    })
    .asMilliseconds();
};

export const millisecToSkiFormat = (
  n: number | null
): SkiFormattedTime | null => {
  if (!n) return null;
  return dayjs(n).format("m.ss.SSS").substring(0, 7) as SkiFormattedTime;
};

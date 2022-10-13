import { Timing } from "api/timings-api";
import { Athlete } from "../api/athletes-api";
import { SkiFormattedTime } from "../types";
import { addTimes, strToMillisec } from "./times";

export const calculateRank = (
  id: Timing["id"],
  timings: Timing[] = [],
  isSort = false
) => {
  const isM1Only = !timings.some((x) => x.m2);
  if (isM1Only) {
    const sorted = timings.sort(
      (a, b) => strToMillisec(a.m1) - strToMillisec(b.m1)
    );
    return sorted.findIndex((x) => x.id === id) + 1;
  } else {
    const withM2 = timings.filter((x) => x.m2);
    const sorted = withM2.sort(
      //@ts-ignore
      (a, b) => addTimes(a.m1, a.m2) - addTimes(b.m1, b.m2)
    );
    const times = timings.find((x) => x.id === id);
    if (!times?.m2) return isSort ? 1000 : "X";
    return sorted.findIndex((x) => x.id === id) + 1;
  }
};

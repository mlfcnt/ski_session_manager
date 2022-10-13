import { Athlete } from "../api/athletes-api";
import { Timing } from "../types";
import { addTimes, strToMillisec } from "./times";

export type Record = {
  id: number;
  athleteId: Athlete["id"];
  athleteFullname: `${Athlete["firstname"]} ${Athlete["lastname"]}`;
  m1: Timing;
  m2: Timing;
};
export const calculateRank = (id: Record["id"], timings: Record[] = []) => {
  const isM1Only = !timings.some((x) => x.m2);
  if (isM1Only) {
    const sorted = timings.sort(
      (a, b) => strToMillisec(a.m1) - strToMillisec(b.m1)
    );
    console.log({ sorted });
  } else {
    const filteredOnlyM1 = timings.filter((x) => x.m2);
    const sorted = filteredOnlyM1.sort(
      (a, b) => addTimes(a.m1, a.m2) - addTimes(b.m1, b.m2)
    );
    const times = timings.find((x) => x.id === id);
    if (!times?.m2) return "X";
    return sorted.findIndex((x) => x.id === id) + 1;
  }
};

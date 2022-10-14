import { Session } from "./session-api";
import { supabase } from "../utils/supabaseClient";
import { Athlete } from "./athletes-api";
import { SkiFormattedTime } from "types";
import { useQuery } from "@tanstack/react-query";

export type Timing = {
  id: number;
  athleteId: Athlete["id"];
  m1: SkiFormattedTime;
  m2?: SkiFormattedTime;
  sessionId: Session["id"];
  athleteName: Athlete["name"];
};

const fetchTimingsBySessionId = async (
  id?: Session["id"]
): Promise<Timing[]> => {
  const { data: timings, error } = await supabase
    .from("timings")
    .select(
      `id,m1,m2, athleteId, sessionId, athleteId (
        id, name
    ) `
    )
    .eq("sessionId", id);

  if (error) throw new Error(error.message);
  return timings.map((timing) => ({
    id: timing.id,
    athleteId: timing.athleteId.id,
    m1: timing.m1,
    m2: timing.m2,
    sessionId: timing.sessionId,
    athleteName: timing.athleteId.name,
  }));
};

export const useTimingsBySessionId = (id?: Session["id"]) =>
  useQuery<Timing[]>(["timings", id], () => fetchTimingsBySessionId(id), {
    enabled: !!id,
  });
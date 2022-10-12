import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

const fetchSessions = async () => {
  const { data, error } = await supabase.from("session").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export type Session = {
  id: number;
  date: Date;
  name: string;
  discipline: Discipline;
  snowCondition: SnowCondition;
  weather: Weather;
};

export type Discipline = "GS" | "SL" | "SG" | "DH" | "AC";
export type SnowCondition =
  | "ARTIF"
  | "ARTIF DURE"
  | "ARTIF ARROSÉE"
  | "INJECTÉE";
export type Weather =
  | "beau temps"
  | "couvert"
  | "jour blanc"
  | "chute de neige";

export const useSessions = () =>
  useQuery<Session[]>(["sessions"], fetchSessions);

import { useQuery } from "@tanstack/react-query";
import { Discipline, SnowCondition, Weather } from "../types";
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

export const useSessions = () =>
  useQuery<Session[]>(["sessions"], fetchSessions);

const fetchSessionById = async (id?: Session["id"]) => {
  const { data, error } = await supabase
    .from("session")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data as Session;
};

export const useSession = (id?: Session["id"]) =>
  useQuery<Session>(["sessions", id], () => fetchSessionById(id), {
    enabled: !!id,
  });

import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabaseClient";

const fetchAthletes = async () => {
  const { data, error } = await supabase.from("athletes").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export type Athlete = {
  id: number;
  firstname: string;
  lastname: string;
};

export const useAthletes = () =>
  useQuery<Athlete[]>(["athletes"], fetchAthletes);

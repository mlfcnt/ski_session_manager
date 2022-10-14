import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

const fetchAthletes = async () => {
  const { data, error } = await supabase.from("athletes").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export type Athlete = {
  id: number;
  name: string;
};

export const useAthletes = () =>
  useQuery<Athlete[]>(["athletes"], fetchAthletes);

export type CreateAthleteDTO = Pick<Athlete, "name">;

const createAthlete = async (toCreate: CreateAthleteDTO) => {
  const { data, error } = await supabase
    .from("athletes")
    .insert(toCreate)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const useCreateAthlete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (toCreate: CreateAthleteDTO) => {
      return createAthlete(toCreate);
    },
    {
      onSuccess: (_result) => {
        queryClient.invalidateQueries(["athletes"]);
      },
    }
  );
  return mutation;
};

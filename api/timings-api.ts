import { Session } from "./session-api";
import { supabase } from "../utils/supabaseClient";
import { Athlete } from "./athletes-api";
import { SkiFormattedTime } from "types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type Timing = {
  id: number;
  athleteId: Athlete["id"];
  m1: SkiFormattedTime | null;
  m2: SkiFormattedTime | null;
  m1Skis?: string;
  m2Skis?: string;
  m1Status?: MStatus;
  m2Status?: MStatus;
  sessionId: Session["id"];
  athleteName: Athlete["name"];
};

type MStatus = "ABD" | "DSQ";

const fetchTimingsBySessionId = async (
  id?: Session["id"]
): Promise<Timing[]> => {
  const { data: timings, error } = await supabase
    .from("timings")
    .select(
      `id,m1,m2,m1Skis, m2Skis, m1Status, m2Status, athleteId, sessionId, athleteId (
        id, name
    ) `
    )
    .eq("sessionId", id);

  if (error) throw new Error(error.message);
  return timings.map((timing) => ({
    ...timing,
    athleteId: timing.athleteId.id,
    athleteName: timing.athleteId.name,
  }));
};

export const useTimingsBySessionId = (id?: Session["id"]) =>
  useQuery<Timing[]>(["timings", id], () => fetchTimingsBySessionId(id), {
    enabled: !!id,
  });

export type CreateTimingDTO = Omit<Timing, "id" | "athleteName">;

const createTiming = async (toCreate: CreateTimingDTO) => {
  const { data, error } = await supabase
    .from("timings")
    .insert(toCreate)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const useCreateTiming = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (toCreate: CreateTimingDTO) => createTiming(toCreate),
    {
      onSuccess: (_result) => {
        queryClient.invalidateQueries(["timings"]);
        queryClient.invalidateQueries(["session", _result[0]?.sessionId]);
      },
    }
  );
  return mutation;
};
export type UpdateTimingDTO = Partial<CreateTimingDTO> & { id: Timing["id"] };

const updateTiming = async (toUpdate: UpdateTimingDTO) => {
  const { data, error } = await supabase
    .from("timings")
    .update(toUpdate)
    .eq("id", toUpdate.id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdateTiming = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (toUpdate: UpdateTimingDTO) => updateTiming(toUpdate),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["timings"]);
      },
    }
  );
  return mutation;
};

const deleteTiming = async (timingId: Timing["id"]) => {
  const { data, error } = await supabase
    .from("timings")
    .delete()
    .eq("id", timingId);

  if (error) throw new Error(error.message);
  return data;
};

export const useDeleteTiming = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (timingId: Timing["id"]) => deleteTiming(timingId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["timings"]);
      },
    }
  );
  return mutation;
};

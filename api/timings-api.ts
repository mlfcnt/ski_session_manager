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
  m3: SkiFormattedTime | null;
  m4: SkiFormattedTime | null;
  m5: SkiFormattedTime | null;
  m6: SkiFormattedTime | null;
  m7: SkiFormattedTime | null;
  m8: SkiFormattedTime | null;
  m1Skis?: string;
  m2Skis?: string;
  m3Skis?: string;
  m4Skis?: string;
  m5Skis?: string;
  m6Skis?: string;
  m7Skis?: string;
  m8Skis?: string;
  m1Status?: MStatus | null;
  m2Status?: MStatus | null;
  m3Status?: MStatus | null;
  m4Status?: MStatus | null;
  m5Status?: MStatus | null;
  m6Status?: MStatus | null;
  m7Status?: MStatus | null;
  m8Status?: MStatus | null;
  sessionId: Session["id"];
  athleteName: Athlete["name"];
};

export type MStatus = "DNF" | "DSQ" | "SC" | "PP";

const fetchTimingsBySessionId = async (
  id?: Session["id"]
): Promise<Timing[]> => {
  const { data: timings, error } = await supabase
    .from("timings")
    .select(
      `id,m1,m2,m3,m4,m5,m6,m7,m8,m1Skis, m2Skis,m3Skis, m3Skis,m4Skis,m5Skis,m6Skis,m7Skis,m8Skis, m1Status, m2Status,m3Status,m4Status,m5Status,m6Status,m7Status,m8Status, athleteId, sessionId, athleteId (
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
const deleteTimingsForSession = async (sessionId: Session["id"]) => {
  const { data, error } = await supabase
    .from("timings")
    .delete()
    .eq("sessionId", sessionId);

  if (error) throw new Error(error.message);
  return data;
};

export const useDeleteTimingsForSession = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (sessionId: Session["id"]) => deleteTimingsForSession(sessionId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["timings"]);
      },
    }
  );
  return mutation;
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Discipline, Mode, SnowCondition, Weather } from "../types";
import { supabase } from "../utils/supabaseClient";
import { useDeleteTimingsForSession } from "./timings-api";
import { groupBy } from "lodash";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

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
  mode: Mode;
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

export type CreateSessionDTO = {
  name: Session["name"];
  date: Session["date"];
  discipline: Session["discipline"];
  snowCondition: Session["snowCondition"];
  weather: Session["weather"];
  mode: Session["mode"];
};

const createSession = async (toCreate: CreateSessionDTO) => {
  const { data, error } = await supabase
    .from("session")
    .insert(toCreate)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation(
    (toCreate: CreateSessionDTO) => createSession(toCreate),
    {
      onSuccess: (_result) => {
        queryClient.invalidateQueries(["sessions"]);
        router.push(`/session/${_result[0].id}`);
      },
    }
  );
  return mutation;
};

const updateSession = async (
  toUpdate: Partial<CreateSessionDTO> & { id: Session["id"] }
) => {
  const { data, error } = await supabase
    .from("session")
    .update(toUpdate)
    .eq("id", toUpdate.id)
    .select();

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (toUpdate: Partial<CreateSessionDTO> & { id: Session["id"] }) =>
      updateSession(toUpdate),
    {
      onSuccess: (_result) => {
        queryClient.invalidateQueries(["sessions", _result[0].id]);
      },
    }
  );
  return mutation;
};

const deleteSession = async (sessionId: Session["id"]) => {
  const { data, error } = await supabase
    .from("session")
    .delete()
    .eq("id", sessionId);

  if (error) throw new Error(error.message);
  return data;
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteTimingForSession } = useDeleteTimingsForSession();

  const mutation = useMutation(
    async (sessionId: Session["id"]) => {
      await deleteTimingForSession(sessionId);
      return deleteSession(sessionId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sessions"]);
      },
    }
  );
  return mutation;
};

export const useWeeklySessions = () => {
  const { data: sessions, isLoading } = useSessions();
  if (!sessions?.length) return { isLoading, sessionsGrouppedByDay: [] };

  const filterByCurrentWeek = (sessions || []).filter((session) =>
    dayjs(session.date).isBetween(
      dayjs().startOf("week"),
      dayjs().endOf("week")
    )
  );

  const grouppedByDay = groupBy(filterByCurrentWeek || [], (session) =>
    dayjs(session.date)
  );

  return { isLoading, sessionsGrouppedByDay: grouppedByDay };
};

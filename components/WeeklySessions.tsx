import { Title } from "@mantine/core";
import { useWeeklySessions } from "api/session-api";
import dayjs from "dayjs";
import React from "react";
import { DaySessions } from "./DaySessions";

export const WeeklySessions = () => {
  const { isLoading, sessionsGrouppedByDay } = useWeeklySessions();
  if (isLoading) return null;
  return (
    <div style={{ maxHeight: "30vh", overflow: "scroll" }}>
      <Title size={20} align="center" style={{ marginBottom: "20px" }}>
        Prochaines sessions
      </Title>
      <div>
        {(Object.entries(sessionsGrouppedByDay) || [])
          .filter(
            ([a]) =>
              dayjs(a).isAfter(dayjs().startOf("day")) ||
              dayjs(a).isSame(dayjs().startOf("day"))
          )
          .sort(([a], [b]) => Number(dayjs(a)) - Number(dayjs(b)))
          .map(([date, sessions]) => (
            <>
              <strong key={date}> {dayjs(date).format("dddd DD MMMM")} </strong>
              <DaySessions
                selectedDate={dayjs(date).toDate()}
                sessions={sessions}
                showNoSessionMessage={false}
              />
            </>
          ))}
      </div>
    </div>
  );
};

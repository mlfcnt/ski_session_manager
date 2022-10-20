import { isSameDate } from "@mantine/dates";
import { IconTrash } from "@tabler/icons";
import { Session, useDeleteSession } from "api/session-api";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

export const DaySessions = ({
  selectedDate,
  sessions,
  showNoSessionMessage = true,
}: {
  selectedDate: Date | null;
  sessions?: Session[];
  showNoSessionMessage?: boolean;
}) => {
  const { mutate: deleteSession } = useDeleteSession();
  if (!selectedDate) return null;

  const sessionsForTheDay = (sessions || []).filter((x) =>
    isSameDate(new Date(x.date), selectedDate)
  );
  if (!sessionsForTheDay?.length && showNoSessionMessage)
    return (
      <p>
        Pas de session enregistrées au{" "}
        {dayjs(selectedDate).format("DD/MM/YYYY")}
      </p>
    );
  return (
    <ul>
      {sessionsForTheDay.map((session) => (
        <li key={session.id} style={{ display: "flex", marginBottom: "10px" }}>
          <Link href={`/session/${session.id}`}>
            <a>{session.name}</a>
          </Link>
          <span style={{ marginLeft: "10px" }}>
            ({session.discipline} - {session.snowCondition} - {session.weather})
          </span>
          <IconTrash
            color="red"
            size={20}
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => {
              const confirm = window.confirm(
                `Etes vous sur de vouloir supprimer la session ${session.name} ?`
              );
              if (confirm) {
                deleteSession(session.id);
              }
            }}
          />
        </li>
      ))}
    </ul>
  );
};

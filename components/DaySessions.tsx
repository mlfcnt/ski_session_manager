import { isSameDate } from "@mantine/dates";
import { IconLock, IconTrash } from "@tabler/icons";
import { Session, useDeleteSession } from "api/session-api";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";
import { AuthorizedInput } from "./AuthorizedInput";

export const DaySessions = ({
  selectedDate,
  sessions,
  showNoSessionMessage = true,
}: {
  selectedDate: Date | null;
  sessions?: Session[];
  showNoSessionMessage?: boolean;
}) => {
  const [showAuthaurizedInput, setShowAuthaurizedInput] = useState(false);
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
        <div key={session.id}>
          <li
            key={session.id}
            style={{
              display: "flex",
              marginBottom: "10px",
            }}
          >
            <Link href={`/session/${session.id}`}>
              <a>{session.name}</a>
            </Link>
            {session.password && (
              <IconLock size={15} style={{ marginLeft: "3px" }} />
            )}

            <div style={{ marginLeft: "10px" }}>
              <span>{session.mode}</span>
            </div>
            <IconTrash
              color="red"
              size={20}
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => {
                if (session.password) {
                  setShowAuthaurizedInput(true);
                } else {
                  const confirm = window.confirm(
                    `Etes vous sur de vouloir supprimer la session ${session.name} ?`
                  );
                  if (confirm) {
                    deleteSession(session.id);
                  }
                }
              }}
            />
          </li>
          {showAuthaurizedInput && (
            <AuthorizedInput
              session={session}
              onAuthaurized={() => deleteSession(session.id)}
              label="Veuillez entrer le mot de passe de la session pour la supprimer"
            />
          )}
        </div>
      ))}
    </ul>
  );
};

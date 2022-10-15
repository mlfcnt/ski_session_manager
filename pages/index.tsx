import { Button, Group, Loader, Stack, Text } from "@mantine/core";
import { DatePicker, isSameDate } from "@mantine/dates";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { useState } from "react";
import { Session, useDeleteSession, useSessions } from "../api/session-api";
import styles from "../styles/Home.module.css";

import Link from "next/link";
import { CreateSessionForm } from "@/components/CreateSessionForm";
import { IconTrash } from "@tabler/icons";

const Home: NextPage = () => {
  const { data: sessions, isLoading } = useSessions();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCreateSessionForm, setShowCreateSessionForm] = useState(false);

  if (isLoading)
    return (
      <Group position="center">
        <Loader />
      </Group>
    );
  return (
    <div
      className={styles.container}
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <Stack justify={"center"}>
        <DatePicker
          locale="fr"
          inputFormat="ddd d MMMM YYYY"
          weekendDays={[10]}
          placeholder="Choisissez la date"
          label="Ouvrir une session existante"
          renderDay={(date) => (
            <div>
              {date.getDate()}
              {(sessions || [])?.find((x) =>
                isSameDate(new Date(x.date), date)
              ) && <span style={{ color: "red" }}>*</span>}
            </div>
          )}
          onChange={setSelectedDate}
        />
        <DaySessions selectedDate={selectedDate} sessions={sessions} />
        <Text>ou</Text>
        <Button onClick={() => setShowCreateSessionForm(true)}>
          Nouvelle session
        </Button>
        {showCreateSessionForm && <CreateSessionForm />}
      </Stack>
    </div>
  );
};

export default Home;

const DaySessions = ({
  selectedDate,
  sessions,
}: {
  selectedDate: Date | null;
  sessions?: Session[];
}) => {
  const { mutate: deleteSession } = useDeleteSession();
  if (!selectedDate) return null;

  const sessionsForTheDay = (sessions || []).filter((x) =>
    isSameDate(new Date(x.date), selectedDate)
  );
  if (!sessionsForTheDay?.length)
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
          <IconTrash
            color="red"
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

import { Button, Group, Loader, Stack, Text } from "@mantine/core";
import { DatePicker, isSameDate } from "@mantine/dates";
import type { NextPage } from "next";
import { useState } from "react";
import { useSessions } from "../api/session-api";
import styles from "../styles/Home.module.css";

import { CreateSessionForm } from "@/components/CreateSessionForm";
import { DaySessions } from "@/components/DaySessions";
import { WeeklySessions } from "@/components/WeeklySessions";

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
        <WeeklySessions />
        <DatePicker
          locale="fr"
          weekendDays={[10]}
          placeholder="Calendrier"
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
          Créer une nouvelle session
        </Button>
        {showCreateSessionForm && <CreateSessionForm />}
      </Stack>
    </div>
  );
};

export default Home;

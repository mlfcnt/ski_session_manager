import { Group, Loader, SimpleGrid, Space, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { useSession, useUpdateSession } from "../../api/session-api";
import { SelectDiscipline } from "../../components/Selects/SelectDiscipline";
import { SelectSnowCondition } from "../../components/Selects/SelectSnowCondition";
import { SelectWeather } from "../../components/Selects/SelectWeather";
import { SessionDatagrid } from "../../components/SessionDatagrid";

const Session = () => {
  const router = useRouter();
  const { id } = router.query;

  const sessionId = Number(id);

  const { data: session, isLoading, error } = useSession(sessionId);
  const { mutate: updateSession } = useUpdateSession();

  if (error) {
    return (
      <h3 style={{ textAlign: "center", color: "red" }}>
        Impossible de retrouver cette session. Elle a peut etre été supprimée
      </h3>
    );
  }
  if (isLoading || !session)
    return (
      <Group position="center">
        <Loader />
      </Group>
    );
  return (
    <div style={{ textAlign: "center" }}>
      <Title size={30} weight="normal">
        {dayjs(session.date).format("DD MMMM YYYY")}
      </Title>
      <Title size={20}>
        {session.name} - {session.mode}
      </Title>
      <Space h="xl" />
      <SimpleGrid cols={3}>
        <SelectDiscipline
          value={session.discipline}
          onChange={(newValue) =>
            newValue && updateSession({ discipline: newValue, id: sessionId })
          }
        />
        <SelectSnowCondition
          value={session.snowCondition}
          onChange={(newValue) =>
            newValue &&
            updateSession({ snowCondition: newValue, id: sessionId })
          }
        />
        <SelectWeather
          value={session.weather}
          onChange={(newValue) =>
            newValue && updateSession({ weather: newValue, id: sessionId })
          }
        />
      </SimpleGrid>
      <Space h={"xl"} />
      <SessionDatagrid session={session} />
    </div>
  );
};

export default Session;

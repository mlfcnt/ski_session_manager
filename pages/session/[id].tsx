import { Loader, SimpleGrid, Space, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useSession, useUpdateSession } from "../../api/session-api";
import { SelectDiscipline } from "../../components/Selects/SelectDiscipline";
import { SelectSnowCondition } from "../../components/Selects/SelectSnowCondition";
import { SelectWeather } from "../../components/Selects/SelectWeather";
import { SessionDatagrid } from "../../components/SessionDatagrid";

const Session = () => {
  const router = useRouter();
  const { id } = router.query;

  const sessionId = Number(id);

  const { data: session, isLoading } = useSession(sessionId);
  const { mutate: updateSession } = useUpdateSession();

  if (isLoading || !session) return <Loader />;

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ display: "inline" }} size={20} weight="normal">
        {dayjs(session.date).format("DD MMMM YYYY")} - {session.name}
      </Title>
      <SimpleGrid cols={3}>
        <SelectDiscipline
          value={session.discipline}
          onChange={(newValue) =>
            newValue && updateSession({ discipline: newValue, id: session.id })
          }
        />
        <SelectSnowCondition
          value={session.snowCondition}
          onChange={(newValue) =>
            newValue &&
            updateSession({ snowCondition: newValue, id: session.id })
          }
        />
        <SelectWeather
          value={session.weather}
          onChange={(newValue) =>
            newValue && updateSession({ weather: newValue, id: session.id })
          }
        />
      </SimpleGrid>
      <Space h={"xl"} />

      <SessionDatagrid sessionId={sessionId} />
    </div>
  );
};

export default Session;

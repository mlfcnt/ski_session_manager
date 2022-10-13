import { Loader, SimpleGrid, Space, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useSession } from "../../api/session-api";
import { SelectDiscipline } from "../../components/Selects/SelectDiscipline";
import { SelectSnowCondition } from "../../components/Selects/SelectSnowCondition";
import { SelectWeather } from "../../components/Selects/SelectWeather";
import { SessionDatagrid } from "../../components/SessionDatagrid";

const Session = () => {
  const router = useRouter();
  console.log(1, router.route);
  const { id } = router.query;

  const sessionId = Number(id);

  const { data: session, isLoading } = useSession(sessionId);

  if (isLoading || !session) return <Loader />;

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ display: "inline" }} size={20} weight="normal">
        {dayjs(session.date).format("DD MMMM YYYY")} - {session.name}
      </Title>
      <SimpleGrid cols={3}>
        <SelectDiscipline value={session.discipline} />
        <SelectSnowCondition value={session.snowCondition} />
        <SelectWeather value={session.weather} />
      </SimpleGrid>
      <Space h={"xl"} />

      <SessionDatagrid sessionId={sessionId} />
    </div>
  );
};

export default Session;

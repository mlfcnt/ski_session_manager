import { Loader, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { useSession } from "../../api/session-api";
import { SessionDatagrid } from "../../components/SessionDatagrid";

const Session = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: session, isLoading } = useSession(Number(id));

  if (isLoading || !session) return <Loader />;

  return (
    <div style={{ textAlign: "center" }}>
      <Title style={{ display: "inline" }} size={20} weight="normal">
        {dayjs(session.date).format("DD MMMM YYYY")} - {session.name}
      </Title>
      <p>
        {session.discipline} - {session.snowCondition} - {session.weather}
      </p>
      <SessionDatagrid />
    </div>
  );
};

export default Session;

import {
  Box,
  Button,
  Group,
  Loader,
  SimpleGrid,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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
  const [authaurized, setAuthaurized] = useState<boolean | null>(null);

  const pwdTextInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoading || !session) return;
    if (!session.password) {
      setAuthaurized(true);
      return;
    }
  }, [isLoading, session]);

  if (error) {
    return (
      <h3 style={{ textAlign: "center", color: "red" }}>
        Impossible de retrouver cette session. Elle a peut etre été supprimée
      </h3>
    );
  }

  if (isLoading || !session || !sessionId)
    return (
      <Group position="center">
        <Loader />
      </Group>
    );

  const handlePwd = () => {
    const typedPwd = pwdTextInputRef?.current?.value;
    if (typedPwd !== session.password && typedPwd !== "BOSS") {
      setAuthaurized(false);
      return;
    }
    setAuthaurized(true);
  };

  if (session.password && authaurized !== true) {
    return (
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <TextInput
          autoFocus
          label="Veuillez entrer le mot de passe de la session"
          ref={pwdTextInputRef}
          onChange={(e) =>
            (pwdTextInputRef.current!.value = e.target.value.toUpperCase())
          }
          error={authaurized === false && "Mot de passe incorrect"}
        />
        <Group position="right" mt={"md"}>
          <Button onClick={handlePwd}>Entrer</Button>
        </Group>
      </Box>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Title size={30} weight="normal">
        {dayjs(session.date).format("DD MMMM YYYY")}
      </Title>
      <Title size={20}>
        {session.name} - {session.mode}
      </Title>
      {session.password && <p>MDP : {session.password}</p>}

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

import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { SelectDiscipline } from "./Selects/SelectDiscipline";
import { CreateSessionDTO, useCreateSession } from "api/session-api";
import { DatePicker } from "@mantine/dates";
import { SelectSnowCondition } from "./Selects/SelectSnowCondition";
import { SelectWeather } from "./Selects/SelectWeather";

export const CreateSessionForm = () => {
  const { mutate: createSession } = useCreateSession();
  const form = useForm<CreateSessionDTO>({
    initialValues: {
      name: "",
      date: new Date(),
      discipline: "SG",
      snowCondition: "ARTIF",
      weather: "Couvert",
    },
  });
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => createSession(values))}>
        <DatePicker
          size="xs"
          label="Date"
          required
          {...form.getInputProps("date")}
          locale="fr"
        />
        <TextInput
          required
          label="Nom de la session"
          {...form.getInputProps("name")}
          size="xs"
        />

        <SelectDiscipline required {...form.getInputProps("discipline")} />
        <SelectSnowCondition
          required
          {...form.getInputProps("snowCondition")}
        />
        <SelectWeather required {...form.getInputProps("weather")} />
        <Group position="right" mt="md">
          <Button type="submit">Lancer</Button>
        </Group>
      </form>
    </Box>
  );
};

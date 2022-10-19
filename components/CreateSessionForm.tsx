import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { SelectDiscipline } from "./Selects/SelectDiscipline";
import { CreateSessionDTO, useCreateSession } from "api/session-api";
import { DatePicker } from "@mantine/dates";
import { SelectSnowCondition } from "./Selects/SelectSnowCondition";
import { SelectWeather } from "./Selects/SelectWeather";
import { Discipline, SnowCondition, Weather } from "types";
import { SessionModesRadioGroup } from "./SessionModesRadioGroup";

export const CreateSessionForm = () => {
  const { mutate: createSession } = useCreateSession();
  const form = useForm<CreateSessionDTO>({
    initialValues: {
      name: "",
      date: new Date(),
      discipline: null as unknown as Discipline,
      snowCondition: null as unknown as SnowCondition,
      weather: null as unknown as Weather,
      mode: "TRAINING",
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
          label="Groupe / lieu de la session"
          {...form.getInputProps("name")}
          size="xs"
        />

        <SelectDiscipline required {...form.getInputProps("discipline")} />
        <SelectSnowCondition
          required
          {...form.getInputProps("snowCondition")}
        />
        <SelectWeather required {...form.getInputProps("weather")} />
        <SessionModesRadioGroup required {...form.getInputProps("mode")} />
        <Group position="right" mt="md">
          <Button type="submit">Lancer</Button>
        </Group>
      </form>
    </Box>
  );
};

import { Box, Button, Checkbox, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { SelectDiscipline } from "./Selects/SelectDiscipline";
import { CreateSessionDTO, useCreateSession } from "api/session-api";
import { DatePicker } from "@mantine/dates";
import { SelectSnowCondition } from "./Selects/SelectSnowCondition";
import { SelectWeather } from "./Selects/SelectWeather";
import { Discipline, SnowCondition, Weather } from "types";
import { SessionModesRadioGroup } from "./SessionModesRadioGroup";
import { faker } from "@faker-js/faker";

export const CreateSessionForm = () => {
  const { mutate: createSession } = useCreateSession();

  const form = useForm<CreateSessionDTO & { protected: boolean }>({
    initialValues: {
      name: "",
      date: new Date(),
      discipline: null as unknown as Discipline,
      snowCondition: null as unknown as SnowCondition,
      weather: null as unknown as Weather,
      mode: "TRAINING",
      protected: false,
      password: faker.random.alpha(4).toUpperCase(),
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          //@ts-ignore
          delete values.protected;
          createSession(values);
        })}
      >
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

        <SelectDiscipline {...form.getInputProps("discipline")} />
        <SelectSnowCondition {...form.getInputProps("snowCondition")} />
        <SelectWeather {...form.getInputProps("weather")} />
        <SessionModesRadioGroup {...form.getInputProps("mode")} />
        <Checkbox
          label="Protéger l'accès par mot de passe"
          mt="xl"
          {...form.getInputProps("protected")}
        />
        {form.values.protected && (
          <TextInput
            mt="xl"
            placeholder="Mot de passe"
            label="Choisissez le mot de passe"
            required={form.values.protected}
            {...form.getInputProps("password")}
          />
        )}
        <Group position="right" mt="md">
          <Button type="submit">Lancer</Button>
        </Group>
      </form>
    </Box>
  );
};

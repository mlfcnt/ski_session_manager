import { Box, Button, Group, Modal, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Session } from "api/session-api";
import { CreateTimingDTO, Timing, useCreateTiming } from "api/timings-api";
import React from "react";
import { SelectAthlete } from "./Selects/SelectAthlete";

type Props = {
  sessionId: Session["id"];
  opened: boolean;
  onClose: () => void;
};

export const CreateTimingFormModal = ({
  sessionId,
  opened,
  onClose,
}: Props) => {
  const { mutate: createTiming } = useCreateTiming();
  const form = useForm<CreateTimingDTO>({
    initialValues: {
      athleteId: null as unknown as Timing["athleteId"],
      m1: null as unknown as Timing["m1"],
      m2: null as unknown as Timing["m2"],
      sessionId,
    },
  });

  return (
    <Modal opened={opened} onClose={onClose}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => {
            createTiming({ ...values, athleteId: Number(values.athleteId) });
            onClose();
          })}
        >
          <SelectAthlete
            required
            {...form.getInputProps("athleteId")}
            label="Coureur"
          />
          <Space />
          <TextInput label="Manche 1" {...form.getInputProps("m1")} />
          <Space />
          <TextInput label="Manche 2" {...form.getInputProps("m2")} />
          <Group position="right" mt="md">
            <Button type="submit">Enregistrer</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

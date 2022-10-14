import { Box, Button, Group, Modal, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Session } from "api/session-api";
import { CreateTimingDTO, Timing, useCreateTiming } from "api/timings-api";
import dayjs from "dayjs";
import React from "react";
import { SkiFormattedTime } from "types";
import { SelectAthlete } from "./Selects/SelectAthlete";
import { TimingInput } from "./TimingInput";

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
      m1: null,
      m2: null,
      sessionId,
    },
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleClose}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => {
            handleClose();
            // les composants de timings revoient des heures/min/sec.. donc je dois salement tricher sur le format...
            createTiming({
              ...values,
              athleteId: Number(values.athleteId),
              m1: !!values.m1
                ? (dayjs(values.m1).format("HH.mm.ss") as SkiFormattedTime)
                : null,
              m2: !!values.m2
                ? (dayjs(values.m2).format("HH.mm.ss") as SkiFormattedTime)
                : null,
            });
          })}
        >
          <SelectAthlete
            required
            label="Coureur"
            {...form.getInputProps("athleteId")}
          />
          <Space h={"xl"} />
          <TimingInput label="Manche 1" {...form.getInputProps("m1")} />
          <Space h={"xl"} />
          <TimingInput label="Manche 2" {...form.getInputProps("m2")} />
          <Group position="right" mt="md">
            <Button type="submit">Enregistrer</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

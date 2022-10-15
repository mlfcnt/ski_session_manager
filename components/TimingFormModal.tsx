import { Box, Button, Group, Modal, Space } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Session } from "api/session-api";
import {
  CreateTimingDTO,
  Timing,
  useCreateTiming,
  useDeleteTiming,
  useUpdateTiming,
} from "api/timings-api";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { SkiFormattedTime } from "types";
import { SelectAthlete } from "./Selects/SelectAthlete";
import { TimingInput } from "./TimingInput";
import { IconTrash, IconDeviceFloppy } from "@tabler/icons";

type Props = {
  sessionId: Session["id"];
  opened: boolean;
  onClose: () => void;
  initialValues?: Partial<CreateTimingDTO> & { id: Timing["id"] };
  isEdit?: boolean;
};

export const TimingFormModal = ({
  sessionId,
  opened,
  onClose,
  initialValues,
  isEdit = false,
}: Props) => {
  console.log({ isEdit, initialValues });
  const { mutate: createTiming } = useCreateTiming();
  const { mutate: updateTiming } = useUpdateTiming();
  const { mutate: deleteTiming } = useDeleteTiming();
  const form = useForm<CreateTimingDTO>({
    initialValues: {
      athleteId: null as unknown as Timing["athleteId"],
      m1: null,
      m2: null,
      sessionId: sessionId,
    },
  });

  useEffect(() => {
    form.reset();
    if (!isEdit || !initialValues?.sessionId) return;
    form.setValues({
      //@ts-ignore
      athleteId: String(initialValues.athleteId),
      //@ts-ignore
      m1: initialValues.m1
        ? dayjs()
            .hour(Number(initialValues.m1.split(".")[0]))
            .minute(Number(initialValues.m1.split(".")[1]))
            .second(Number(initialValues.m1.split(".")[2]))
            .toDate()
        : null,
      //@ts-ignore
      m2: initialValues.m2
        ? dayjs()
            .hour(Number(initialValues.m2.split(".")[0]))
            .minute(Number(initialValues.m2.split(".")[1]))
            .second(Number(initialValues.m2.split(".")[2]))
            .toDate()
        : null,
    });
  }, [isEdit, initialValues]);

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
            const valuesToSave = {
              ...values,
              athleteId: Number(values.athleteId),
              m1: !!values.m1
                ? (dayjs(values.m1).format("HH.mm.ss") as SkiFormattedTime)
                : null,
              m2: !!values.m2
                ? (dayjs(values.m2).format("HH.mm.ss") as SkiFormattedTime)
                : null,
            };
            if (isEdit) {
              updateTiming({ ...valuesToSave, id: initialValues!.id });
              return;
            } else {
              createTiming(valuesToSave);
            }
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
          <Space h={"xl"} />
          <Group position={isEdit ? "apart" : "right"} mt="md">
            {isEdit && (
              <Button
                color={"red"}
                leftIcon={<IconTrash />}
                onClick={() => {
                  handleClose();
                  deleteTiming(initialValues!.id);
                }}
              >
                Supprimer
              </Button>
            )}
            <Button type="submit" leftIcon={<IconDeviceFloppy />}>
              Enregistrer
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

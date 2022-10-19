import { Box, Button, Group, Modal, Space, Title } from "@mantine/core";
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
import { SelectAthlete } from "../Selects/SelectAthlete";
import { IconTrash, IconDeviceFloppy } from "@tabler/icons";
import { MTimingBlock } from "./MTimingBlock";
import { SkiFormattedTime } from "types";

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
  const { mutate: createTiming } = useCreateTiming();
  const { mutate: updateTiming } = useUpdateTiming();
  const { mutate: deleteTiming } = useDeleteTiming();

  const initialFormValues = {
    athleteId: null as unknown as Timing["athleteId"],
    m1: "00.00.00" as SkiFormattedTime,
    m2: "00.00.00" as SkiFormattedTime,
    m3: "00.00.00" as SkiFormattedTime,
    m4: "00.00.00" as SkiFormattedTime,
    m5: "00.00.00" as SkiFormattedTime,
    m6: "00.00.00" as SkiFormattedTime,
    m7: "00.00.00" as SkiFormattedTime,
    m8: "00.00.00" as SkiFormattedTime,
    m1Skis: "",
    m2Skis: "",
    m3Skis: "",
    m4Skis: "",
    m5Skis: "",
    m6Skis: "",
    m7Skis: "",
    m8Skis: "",
    sessionId: sessionId,
  };

  const timeValidator = (value: string) =>
    !value || dayjs(`${value}0`, "mm.ss.SSS", true).isValid()
      ? null
      : "Format invalide";

  const form = useForm<CreateTimingDTO>({
    initialValues: initialFormValues,
    validate: {
      m1: timeValidator,
      m2: timeValidator,
      m3: timeValidator,
      m4: timeValidator,
      m5: timeValidator,
      m6: timeValidator,
      m7: timeValidator,
      m8: timeValidator,
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  useEffect(() => {
    if (!isEdit || !initialValues?.sessionId) return;
    form.setValues({
      athleteId: String(
        initialValues.athleteId
      ) as unknown as Timing["athleteId"],
      m1: initialValues.m1 || initialFormValues.m1,
      m2: initialValues.m2 || initialFormValues.m2,
      m3: initialValues.m2 || initialFormValues.m2,
      m4: initialValues.m2 || initialFormValues.m2,
      m5: initialValues.m2 || initialFormValues.m2,
      m6: initialValues.m2 || initialFormValues.m2,
      m7: initialValues.m2 || initialFormValues.m2,
      m8: initialValues.m2 || initialFormValues.m2,
      m1Skis: initialValues.m1Skis,
      m2Skis: initialValues.m2Skis,
      m3Skis: initialValues.m2Skis,
      m4Skis: initialValues.m2Skis,
      m5Skis: initialValues.m2Skis,
      m6Skis: initialValues.m2Skis,
      m7Skis: initialValues.m2Skis,
      m8Skis: initialValues.m2Skis,
      m1Status: initialValues.m1Status,
      m2Status: initialValues.m1Status,
      m3Status: initialValues.m2Status,
      m4Status: initialValues.m2Status,
      m5Status: initialValues.m2Status,
      m6Status: initialValues.m2Status,
      m7Status: initialValues.m2Status,
      m8Status: initialValues.m2Status,
    });
  }, [
    initialValues?.athleteId,
    initialValues?.m1,
    initialValues?.m2,
    initialValues?.m3,
    initialValues?.m4,
    initialValues?.m5,
    initialValues?.m6,
    initialValues?.m7,
    initialValues?.m8,
    initialValues?.m1Skis,
    initialValues?.m1Status,
    initialValues?.m2Skis,
    initialValues?.m2Status,
    initialValues?.m3Skis,
    initialValues?.m3Status,
    initialValues?.m4Skis,
    initialValues?.m4Status,
    initialValues?.m5Skis,
    initialValues?.m5Status,
    initialValues?.m6Skis,
    initialValues?.m6Status,
    initialValues?.m7Skis,
    initialValues?.m7Status,
    initialValues?.m8Skis,
    initialValues?.m8Status,
    initialValues?.sessionId,
    isEdit,
  ]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      overlayBlur={2}
      overflow="inside"
      title={
        <Title align="center" size={22}>
          Ajout / modification de temps
        </Title>
      }
    >
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => {
            // les composants de timings revoient des heures/min/sec.. donc je dois salement tricher sur le format...
            const valuesToSave = {
              ...values,
              athleteId: Number(values.athleteId),
              m1: values.m1 !== "00.00.00" ? values.m1 : null,
              m2: values.m2 !== "00.00.00" ? values.m2 : null,
              m3: values.m1 !== "00.00.00" ? values.m1 : null,
              m4: values.m2 !== "00.00.00" ? values.m2 : null,
              m5: values.m1 !== "00.00.00" ? values.m1 : null,
              m6: values.m2 !== "00.00.00" ? values.m2 : null,
              m7: values.m1 !== "00.00.00" ? values.m1 : null,
              m8: values.m2 !== "00.00.00" ? values.m2 : null,
            };
            if (isEdit) {
              updateTiming({ ...valuesToSave, id: initialValues!.id });
            } else {
              createTiming(valuesToSave);
            }
            handleClose();
          })}
        >
          <SelectAthlete
            required
            label="Coureur"
            {...form.getInputProps("athleteId")}
          />
          <MTimingBlock
            form={form}
            initialFormValues={initialFormValues}
            mNumber={1}
          />
          <MTimingBlock
            form={form}
            initialFormValues={initialFormValues}
            mNumber={2}
          />
          <MTimingBlock
            form={form}
            initialFormValues={initialFormValues}
            mNumber={3}
          />
          <MTimingBlock
            form={form}
            initialFormValues={initialFormValues}
            mNumber={4}
          />
          <MTimingBlock
            form={form}
            initialFormValues={initialFormValues}
            mNumber={5}
          />
          <MTimingBlock
            form={form}
            initialFormValues={initialFormValues}
            mNumber={6}
          />
          <MTimingBlock
            form={form}
            initialFormValues={initialFormValues}
            mNumber={7}
          />
          <MTimingBlock
            form={form}
            initialFormValues={initialFormValues}
            mNumber={8}
          />

          <Space h={"xl"} />
          <Group position={isEdit ? "apart" : "right"} mt="md">
            {isEdit && (
              <Button
                color={"red"}
                leftIcon={<IconTrash />}
                onClick={() => {
                  handleClose();
                  const confirm = window.confirm(
                    "Etes vous sur de vouloir supprimer cette entrée ?"
                  );
                  if (confirm) {
                    deleteTiming(initialValues!.id);
                  }
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

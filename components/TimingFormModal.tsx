import {
  Box,
  Button,
  Group,
  Modal,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Session } from "api/session-api";
import {
  CreateTimingDTO,
  MStatus,
  Timing,
  useCreateTiming,
  useDeleteTiming,
  useUpdateTiming,
} from "api/timings-api";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { SelectAthlete } from "./Selects/SelectAthlete";
import { TimingInput } from "./TimingInput";
import { IconTrash, IconDeviceFloppy } from "@tabler/icons";
import { StatusRadioGroup } from "./StatusRadioGroup";
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
    m1Skis: "",
    m2Skis: "",
    m1Status: undefined,
    m2Status: undefined,
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
      m1Skis: initialValues.m1Skis,
      m2Skis: initialValues.m2Skis,
      m1Status: initialValues.m1Status,
      m2Status: initialValues.m2Status,
      m2: initialValues.m2 || initialFormValues.m2,
    });
  }, [
    initialValues?.athleteId,
    initialValues?.m1,
    initialValues?.m1Skis,
    initialValues?.m1Status,
    initialValues?.m2,
    initialValues?.m2Skis,
    initialValues?.m2Status,
    initialValues?.sessionId,
    isEdit,
  ]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleClose} overlayBlur={2}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit((values) => {
            // les composants de timings revoient des heures/min/sec.. donc je dois salement tricher sur le format...
            const valuesToSave = {
              ...values,
              athleteId: Number(values.athleteId),
              m1: values.m1 !== "00.00.00" ? values.m1 : null,
              m2: values.m2 !== "00.00.00" ? values.m2 : null,
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
          <Space h={"xl"} />
          <Title size={"20px"}>Manche 1</Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TimingInput
              label="Temps"
              {...form.getInputProps("m1")}
              onChange={(e) => {
                form.setFieldValue(
                  "m1",
                  (e?.target?.value as SkiFormattedTime) || initialFormValues.m1
                );
                form.setFieldValue("m1Status", null);
              }}
            />
            <StatusRadioGroup
              {...form.getInputProps("m1Status")}
              onChange={(e: MStatus) => {
                form.setFieldValue("m1Status", e);
                form.setFieldValue("m1", initialFormValues.m1);
              }}
            />
            <TextInput
              size="sm"
              label="Skis"
              variant="filled"
              {...form.getInputProps("m1Skis")}
            />
          </div>
          <Space h={"xl"} />
          <Title size={"20px"}>Manche 2</Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TimingInput
              label="Temps"
              {...form.getInputProps("m2")}
              onChange={(e) => {
                form.setFieldValue(
                  "m2",
                  (e?.target?.value as SkiFormattedTime) || initialFormValues.m2
                );
                form.setFieldValue("m2Status", null);
              }}
            />
            <StatusRadioGroup
              {...form.getInputProps("m2Status")}
              onChange={(e: MStatus) => {
                form.setFieldValue("m2Status", e);
                form.setFieldValue("m2", initialFormValues.m2);
              }}
            />
            <TextInput
              size="sm"
              label="Skis"
              variant="filled"
              {...form.getInputProps("m2Skis")}
            />
          </div>
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

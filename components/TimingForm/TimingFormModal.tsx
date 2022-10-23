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
import React, { useEffect, useRef } from "react";
import { SelectAthlete } from "../Selects/SelectAthlete";
import { IconTrash, IconDeviceFloppy } from "@tabler/icons";
import { MTimingBlock } from "./MTimingBlock";
import { SkiFormattedTime } from "types";

type Props = {
  session: Session;
  opened: boolean;
  onClose: () => void;
  initialValues?: Partial<CreateTimingDTO> & { id: Timing["id"] };
  isEdit?: boolean;
};

export const TimingFormModal = ({
  session,
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
    m1: "000000" as SkiFormattedTime,
    m2: "000000" as SkiFormattedTime,
    m3: "000000" as SkiFormattedTime,
    m4: "000000" as SkiFormattedTime,
    m5: "000000" as SkiFormattedTime,
    m6: "000000" as SkiFormattedTime,
    m7: "000000" as SkiFormattedTime,
    m8: "000000" as SkiFormattedTime,
    m1Skis: "",
    m2Skis: "",
    m3Skis: "",
    m4Skis: "",
    m5Skis: "",
    m6Skis: "",
    m7Skis: "",
    m8Skis: "",
    sessionId: session.id,
  };

  const timeValidator = (value: string) => {
    return !value || dayjs(`${value}0`, "mmssSSS", true).isValid()
      ? null
      : "Format invalide";
  };

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
  });

  useEffect(() => {
    if (!isEdit || !initialValues?.sessionId) return;
    form.setValues({
      athleteId: String(
        initialValues.athleteId
      ) as unknown as Timing["athleteId"],
      m1: initialValues.m1
        ? (initialValues.m1?.replaceAll(".", "") as SkiFormattedTime)
        : initialFormValues.m1,
      m2: initialValues.m2
        ? (initialValues.m2?.replaceAll(".", "") as SkiFormattedTime)
        : initialFormValues.m2,
      m3: initialValues.m3
        ? (initialValues.m3?.replaceAll(".", "") as SkiFormattedTime)
        : initialFormValues.m3,
      m4: initialValues.m4
        ? (initialValues.m4?.replaceAll(".", "") as SkiFormattedTime)
        : initialFormValues.m4,
      m5: initialValues.m5
        ? (initialValues.m5?.replaceAll(".", "") as SkiFormattedTime)
        : initialFormValues.m5,
      m6: initialValues.m6
        ? (initialValues.m6?.replaceAll(".", "") as SkiFormattedTime)
        : initialFormValues.m6,
      m7: initialValues.m7
        ? (initialValues.m7?.replaceAll(".", "") as SkiFormattedTime)
        : initialFormValues.m7,
      m8: initialValues.m8
        ? (initialValues.m8?.replaceAll(".", "") as SkiFormattedTime)
        : initialFormValues.m8,

      m1Skis: initialValues.m1Skis,
      m2Skis: initialValues.m2Skis,
      m3Skis: initialValues.m3Skis,
      m4Skis: initialValues.m4Skis,
      m5Skis: initialValues.m5Skis,
      m6Skis: initialValues.m6Skis,
      m7Skis: initialValues.m7Skis,
      m8Skis: initialValues.m8Skis,
      m1Status: initialValues.m1Status,
      m2Status: initialValues.m2Status,
      m3Status: initialValues.m3Status,
      m4Status: initialValues.m4Status,
      m5Status: initialValues.m5Status,
      m6Status: initialValues.m6Status,
      m7Status: initialValues.m7Status,
      m8Status: initialValues.m8Status,
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
      fullScreen
      overflow="inside"
      size="80vw"
      opened={opened}
      onClose={handleClose}
      overlayBlur={2}
      title={
        <Title align="center" size={22}>
          Ajout / modification de temps
        </Title>
      }
    >
      <Box>
        <form
          onSubmit={form.onSubmit((values) => {
            // les composants de timings revoient des heures/min/sec.. donc je dois salement tricher sur le format...
            const valuesToSave = {
              ...values,
              athleteId: Number(values.athleteId),
              m1:
                values.m1 && values.m1 !== ("000000" as SkiFormattedTime)
                  ? (values.m1
                      .replace(/.{2}/g, "$&.")
                      .slice(0, -1) as SkiFormattedTime)
                  : null,
              m2:
                values.m2 && values.m2 !== ("000000" as SkiFormattedTime)
                  ? (values.m2
                      .replace(/.{2}/g, "$&.")
                      .slice(0, -1) as SkiFormattedTime)
                  : null,
              m3:
                values.m3 && values.m3 !== ("000000" as SkiFormattedTime)
                  ? (values.m3
                      .replace(/.{2}/g, "$&.")
                      .slice(0, -1) as SkiFormattedTime)
                  : null,
              m4:
                values.m4 && values.m4 !== ("000000" as SkiFormattedTime)
                  ? (values.m4
                      .replace(/.{2}/g, "$&.")
                      .slice(0, -1) as SkiFormattedTime)
                  : null,
              m5:
                values.m5 && values.m5 !== ("000000" as SkiFormattedTime)
                  ? (values.m5
                      .replace(/.{2}/g, "$&.")
                      .slice(0, -1) as SkiFormattedTime)
                  : null,
              m6:
                values.m6 && values.m6 !== ("000000" as SkiFormattedTime)
                  ? (values.m6
                      .replace(/.{2}/g, "$&.")
                      .slice(0, -1) as SkiFormattedTime)
                  : null,
              m7:
                values.m7 && values.m7 !== ("000000" as SkiFormattedTime)
                  ? (values.m7
                      .replace(/.{2}/g, "$&.")
                      .slice(0, -1) as SkiFormattedTime)
                  : null,
              m8:
                values.m8 && values.m8 !== ("000000" as SkiFormattedTime)
                  ? (values.m8
                      .replace(/.{2}/g, "$&.")
                      .slice(0, -1) as SkiFormattedTime)
                  : null,
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
          {session.mode === "TRAINING" && (
            <>
              {" "}
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
            </>
          )}

          <Space h={"xl"} />
          <Group position={isEdit ? "apart" : "right"} mt="md">
            {isEdit && (
              <Button
                color="red"
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

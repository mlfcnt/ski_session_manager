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
import { StatusRadioGroup } from "./StatusRadioGroup";

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
  const form = useForm<CreateTimingDTO>({
    initialValues: {
      athleteId: null as unknown as Timing["athleteId"],
      m1: null,
      m2: null,
      m1Skis: "",
      m2Skis: "",
      m1Status: undefined,
      m2Status: undefined,
      sessionId: sessionId,
    },
  });

  useEffect(() => {
    if (form.values.m1Status) {
      form.setValues({
        m1: null,
      });
    }
    if (form.values.m2Status) {
      form.setValues({
        m2: null,
      });
    }
  }, [form.values.m1Status, form.values.m2Status]);

  useEffect(() => {
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
      m1Skis: initialValues.m1Skis,
      m1Status: initialValues.m1Status,
      m2Status: initialValues.m2Status,
      //@ts-ignore
      m2: initialValues.m2
        ? dayjs()
            .hour(Number(initialValues.m2.split(".")[0]))
            .minute(Number(initialValues.m2.split(".")[1]))
            .second(Number(initialValues.m2.split(".")[2]))
            .toDate()
        : null,
    });
  }, [initialValues?.id]);

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
          <Title size={"20px"}>Manche 1</Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TimingInput label="Temps" {...form.getInputProps("m1")} />
            <StatusRadioGroup {...form.getInputProps("m1Status")} />
            <TextInput
              size="sm"
              label="Skis"
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
            <TimingInput label="Temps" {...form.getInputProps("m2")} />
            <StatusRadioGroup {...form.getInputProps("m2Status")} />
            <TextInput
              size="sm"
              label="Skis"
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

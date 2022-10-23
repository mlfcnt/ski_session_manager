import { Space, TextInput, Title } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { CreateTimingDTO, MStatus } from "api/timings-api";
import React from "react";
import { SkiFormattedTime } from "types";
import { StatusRadioGroup } from "../StatusRadioGroup";
import { TimingInput } from "../TimingInput";

type Props = {
  mNumber: number;
  form: UseFormReturnType<CreateTimingDTO>;
  initialFormValues: any;
};

export const MTimingBlock = ({ form, initialFormValues, mNumber }: Props) => {
  return (
    <>
      <Space h={"xl"} />
      <Title size={"20px"} style={{ display: "inline-block" }}>
        Manche {mNumber}
      </Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TimingInput
          label="Temps"
          {...form.getInputProps(`m${mNumber}`)}
          onChange={(e: string) => {
            form.setFieldValue(
              `m${mNumber}`,
              (e as SkiFormattedTime) || initialFormValues[`m${mNumber}`]
            );
            form.setFieldValue(`m${mNumber}Status`, null);
          }}
          m={mNumber}
          form={form}
        />
        <StatusRadioGroup
          {...form.getInputProps(`m${mNumber}Status`)}
          onChange={(e: MStatus) => {
            form.setFieldValue(`m${mNumber}Status`, e);
            form.setFieldValue(`m${mNumber}`, "000000");
          }}
        />
        <TextInput
          size="sm"
          label="Skis"
          variant="filled"
          {...form.getInputProps(`m${mNumber}Skis`)}
        />
      </div>
    </>
  );
};

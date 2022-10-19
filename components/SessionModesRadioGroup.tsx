import { Radio, RadioGroupProps } from "@mantine/core";
import React from "react";

export const SessionModesRadioGroup = ({
  ...props
}: Omit<RadioGroupProps, "children">) => {
  return (
    <Radio.Group {...props} label="Mode">
      <Radio value="RACE" label="Race (2 manches + temps total)" />
      <Radio value="TRAINING" label="Training (8 manches)" />
    </Radio.Group>
  );
};

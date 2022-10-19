import { Radio, RadioGroupProps } from "@mantine/core";
import React from "react";

export const StatusRadioGroup = ({
  ...props
}: Omit<RadioGroupProps, "children">) => {
  return (
    <Radio.Group {...props} style={{ display: "flex", justifyContent: "end" }}>
      <Radio value="DNF" label="DNF" />
      <Radio value="DSQ" label="DSQ" />
      <Radio value="SC" label="SC" />
      <Radio value="PP" label="PP" />
    </Radio.Group>
  );
};

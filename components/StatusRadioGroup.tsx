import { Radio, RadioGroupProps } from "@mantine/core";
import React from "react";

export const StatusRadioGroup = ({
  ...props
}: Omit<RadioGroupProps, "children">) => {
  return (
    <Radio.Group {...props} style={{ display: "flex", justifyContent: "end" }}>
      <Radio value="ABD" label="ABD" />
      <Radio value="DSQ" label="DSQ" />
    </Radio.Group>
  );
};

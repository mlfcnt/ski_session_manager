import { Radio, RadioGroupProps } from "@mantine/core";
import React from "react";

export const StatusRadioGroup = ({
  ...props
}: Omit<RadioGroupProps, "children">) => {
  return (
    <Radio.Group
      {...props}
      style={{ display: "flex", justifyContent: "end" }}
      size="xs"
    >
      <Radio value="DNS" label="DNS" size="xs" />
      <Radio value="DNF" label="DNF" size="xs" />
      <Radio value="DSQ" label="DSQ" size="xs" />
      <Radio value="SC" label="SC" size="xs" />
      <Radio value="PP" label="PP" size="xs" />
    </Radio.Group>
  );
};

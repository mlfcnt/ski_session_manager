import { Center, Select } from "@mantine/core";
import React from "react";
import { SnowCondition } from "../../types";

export const SelectSnowCondition = ({
  value,
  ...props
}: {
  value?: SnowCondition;
  onChange?(val: SnowCondition | null): void;
}) => {
  return (
    <Center>
      <Select
        label="Neige"
        data={[
          { value: "ARTIF", label: "ARTIF" },
          { value: "ARTIF DURE", label: "ARTIF DURE" },
          { value: "ARTIF ARROSÉE", label: "ARTIF ARROSÉE" },
          { value: "INJECTÉE", label: "INJECTÉE" },
          { value: "SNOWFARMING", label: "SNOWFARMING" },
          { value: "SALÉE", label: "SALÉE" },
          { value: "REGEL", label: "REGEL" },
        ].sort((a, b) => a.label.localeCompare(b.label))}
        defaultValue={value}
        size="xs"
        variant="filled"
        width={20}
        {...props}
      />
    </Center>
  );
};

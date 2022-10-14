import { Center, Select } from "@mantine/core";
import React from "react";
import { Discipline } from "../../types";

export const SelectDiscipline = ({
  value,
  ...props
}: {
  value?: Discipline;
  onChange?(val: Discipline | null): void;
}) => {
  return (
    <Center>
      <Select
        label="Discipline"
        data={[
          { value: "AC", label: "AC" },
          { value: "DH", label: "DH" },
          { value: "GS", label: "GS" },
          { value: "SG", label: "SG" },
          { value: "SL", label: "SL" },
        ]}
        defaultValue={value}
        variant="filled"
        size="xs"
        width={20}
        {...props}
      />
    </Center>
  );
};

import { Center, Select } from "@mantine/core";
import React from "react";
import { Discipline } from "../../types";

export const SelectDiscipline = ({ value }: { value?: Discipline }) => {
  return (
    <Center>
      <Select
        label="Discipline"
        data={[
          { value: "GS", label: "GS" },
          { value: "SL", label: "SL" },
          { value: "SG", label: "SG" },
          { value: "DH", label: "DH" },
          { value: "AC", label: "AC" },
        ]}
        defaultValue={value}
        size="xs"
        width={20}
      />
    </Center>
  );
};

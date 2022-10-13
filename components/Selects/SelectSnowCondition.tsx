import { Center, Select } from "@mantine/core";
import React from "react";
import { SnowCondition } from "../../types";

export const SelectSnowCondition = ({ value }: { value?: SnowCondition }) => {
  return (
    <Center>
      <Select
        label="Neige"
        data={[
          { value: "ARTIF", label: "ARTIF" },
          { value: "ARTIF DURE", label: "ARTIF DURE" },
          { value: "ARTIF ARROSÉE", label: "ARTIF ARROSÉE" },
          { value: "INJECTÉE", label: "INJECTÉE" },
        ]}
        defaultValue={value}
        size="xs"
        width={20}
      />
    </Center>
  );
};

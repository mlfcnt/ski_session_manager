import { Center, Select } from "@mantine/core";
import React from "react";
import { Weather } from "../../types";

export const SelectWeather = ({
  value,
  ...props
}: {
  value?: Weather;
  onChange?(val: Weather | null): void;
}) => {
  return (
    <Center>
      <Select
        label="Météo"
        data={[
          { value: "Beau temps", label: "Beau temps" },
          { value: "Couvert", label: "Couvert" },
          { value: "Jour blanc", label: "Jour blanc" },
          { value: "Chute de neige", label: "Chute de neige" },
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

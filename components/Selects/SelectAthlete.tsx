import { Select, SelectProps } from "@mantine/core";
import React from "react";
import { useAthletes, useCreateAthlete } from "../../api/athletes-api";

export const SelectAthlete = ({ ...props }: Omit<SelectProps, "data">) => {
  const { data: athletes } = useAthletes();
  const { mutateAsync: createAthlete } = useCreateAthlete();
  return (
    <Select
      data={(athletes || [])
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((x) => ({
          value: String(x.id),
          label: x.name,
        }))}
      size="sm"
      creatable
      getCreateLabel={(query) => `+ Créer ${query}`}
      searchable
      clearable
      variant="filled"
      onCreate={(name) => {
        createAthlete({ name });
        return "";
      }}
      {...props}
    />
  );
};

import { Select } from "@mantine/core";
import React from "react";
import { Athlete, useAthletes, useCreateAthlete } from "../../api/athletes-api";

export const SelectAthlete = ({
  value,
  ...props
}: {
  value?: Athlete["id"];
}) => {
  const { data: athletes } = useAthletes();
  const { mutateAsync: createAthlete } = useCreateAthlete();

  return (
    <Select
      data={(athletes || []).map((x) => ({
        value: String(x.id),
        label: x.name,
      }))}
      defaultValue={String(value)}
      size="sm"
      creatable
      getCreateLabel={(query) => `+ Créer ${query}`}
      searchable
      onCreate={(name) => {
        createAthlete({ name }).then(() => ({ label: "test", value: "value" }));
      }}
      {...props}
    />
  );
};

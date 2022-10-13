import { Select } from "@mantine/core";
import React from "react";
import { Athlete, useAthletes } from "../../api/athletes-api";

export const SelectAthlete = ({
  value,
  ...props
}: {
  value?: Athlete["id"];
}) => {
  const { data: athletes } = useAthletes();

  return (
    <Select
      data={(athletes || []).map((x) => ({
        value: String(x.id),
        label: `${x.firstname} ${x.lastname}`,
      }))}
      defaultValue={String(value)}
      size="sm"
      creatable
      getCreateLabel={(query) => `+ Créer ${query}`}
      searchable
      onCreate={(query) => {
        //TODO create athlete
        return "";
      }}
      {...props}
    />
  );
};

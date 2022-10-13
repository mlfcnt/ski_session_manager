import { Center, Select } from "@mantine/core";
import React from "react";
import { Athlete, useAthletes } from "../../api/athletes-api";

export const SelectAthlete = ({ value }: { value?: Athlete["id"] }) => {
  const { data: athletes } = useAthletes();
  return (
    <Center>
      <Select
        data={(athletes || []).map((x) => ({
          value: String(x.id),
          label: `${x.firstname} ${x.lastname}`,
        }))}
        defaultValue={String(value)}
        size="xs"
        width={20}
      />
    </Center>
  );
};

import { ActionIcon, Affix, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { IconMoonStars, IconSun } from "@tabler/icons";

export const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Affix position={{ top: 15, right: 15 }}>
      <ActionIcon
        variant="default"
        color={dark ? "yellow" : "blue"}
        onClick={() => toggleColorScheme()}
        title="Changer de theme"
      >
        {dark ? (
          <IconSun size={32} color="gold" />
        ) : (
          <IconMoonStars size={32} fill="lightblue" />
        )}
      </ActionIcon>
    </Affix>
  );
};

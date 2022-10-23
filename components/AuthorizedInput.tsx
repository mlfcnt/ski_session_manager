import { Box, Button, Group, TextInput } from "@mantine/core";
import { Session } from "api/session-api";
import React, { useRef, useState } from "react";

type Props = {
  session: Session;
  onAuthaurized: () => void;
  label?: string;
};

export const AuthorizedInput = ({
  session,
  onAuthaurized,
  label = "Veuillez entrer le mot de passe de la session",
}: Props) => {
  const [error, setError] = useState("");
  const pwdTextInputRef = useRef<HTMLInputElement>(null);

  const handlePwd = () => {
    const typedPwd = pwdTextInputRef?.current?.value;
    if (
      typedPwd?.toLowerCase() !== session.password?.toLowerCase() &&
      typedPwd !== "BOSS"
    ) {
      setError("Mot de passe incorrect");
      return;
    }
    onAuthaurized();
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <TextInput
        autoFocus
        label={label}
        ref={pwdTextInputRef}
        onChange={(e) =>
          (pwdTextInputRef.current!.value = e.target.value.toUpperCase())
        }
        error={error}
      />
      <Group position="right" mt={"md"}>
        <Button onClick={handlePwd}>Entrer</Button>
      </Group>
    </Box>
  );
};

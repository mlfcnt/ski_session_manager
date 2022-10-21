import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Title,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useEffect } from "react";
import "devextreme/dist/css/dx.light.css";
import frMessages from "devextreme/localization/messages/fr.json";
import { locale, loadMessages } from "devextreme/localization";
import Link from "next/link";
import Image from "next/image";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const queryClient = new QueryClient();

  useEffect(() => {
    dayjs.locale("fr");
    loadMessages(frMessages);
    locale("fr");
  }, []);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: useColorScheme("dark"),
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <Head>
        <title>FFS timing session</title>
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <QueryClientProvider client={queryClient}>
            <div
              style={{
                minHeight: "100vh",
              }}
            >
              <Title style={{ marginBottom: "20px", textAlign: "center" }}>
                <Link href="/">FFS timing session</Link>
              </Title>
              <ThemeSwitcher />
              <Component {...pageProps} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "100px",
                  marginBottom: "30px",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={
                    "https://ffs.fr/wp-content/themes/ffs/library/images/logo-ffs.svg"
                  }
                  alt="ffs logo"
                  height="110px"
                  width="110px"
                />
              </div>
            </div>
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

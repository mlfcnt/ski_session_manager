import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, Title } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useEffect } from "react";
import "devextreme/dist/css/dx.light.css";
import frMessages from "devextreme/localization/messages/fr.json";
import { locale, loadMessages } from "devextreme/localization";
import Link from "next/link";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const queryClient = new QueryClient();

  useEffect(() => {
    dayjs.locale("fr");
    loadMessages(frMessages);
    locale("fr");
  }, []);

  return (
    <>
      <Head>
        <title>FFS timing session</title>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <div
            style={{
              backgroundImage: `url("https://ffs.fr/wp-content/themes/ffs/library/images/logo-ffs.svg")`,
              backgroundSize: "15vh",
              backgroundPositionY: "80vh",
              backgroundPositionX: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
            }}
          >
            <Title style={{ marginBottom: "20px", textAlign: "center" }}>
              <Link href="/">FFS timing session</Link>
            </Title>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, Title } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useEffect } from "react";
import Link from "next/link";
import "devextreme/dist/css/dx.light.css";
import frMessages from "devextreme/localization/messages/fr.json";
import { locale, loadMessages } from "devextreme/localization";

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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
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
              backgroundImage: `url("https://static8.depositphotos.com/1491329/1068/i/950/depositphotos_10687474-stock-photo-funny-hamster.jpg")`,
              backgroundPositionY: "45vh",
              backgroundPositionX: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
            }}
          >
            <Title style={{ marginBottom: "20px", textAlign: "center" }}>
              <Link href={"/"}>FFS timing session</Link>
            </Title>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

import React, { useCallback, useEffect, useRef, useState } from "react";
import DataGrid, {
  Column,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import {
  addTimes,
  formatTimeForDx,
  millisecToSkiFormat,
  strToMillisec,
} from "../helpers/times";
import { SkiFormattedTime } from "../types";
import { useTimingsBySessionId, Timing, MStatus } from "api/timings-api";
import { Session } from "api/session-api";
import { Button, Group, Loader, Space, useMantineTheme } from "@mantine/core";
import { TimingFormModal } from "./TimingForm/TimingFormModal";
import { IconPlaylistAdd, IconRefresh } from "@tabler/icons";

type Props = {
  session: Session;
};

export const SessionDatagrid = ({ session }: Props) => {
  const [showCreateTimingModal, setShowCreateTimingModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Timing | null>(null);
  const { data: timings, refetch: refetchTimings } = useTimingsBySessionId(
    session.id
  );

  const gridRef = useRef<DataGrid>(null);
  const { colorScheme } = useMantineTheme();

  useEffect(() => {
    (async () => {
      if (colorScheme === "dark") {
        await import(`devextreme/dist/css/dx.dark.css`!);
        return;
      }
      await import(`devextreme/dist/css/dx.light.css`!);
    })();
  }, [colorScheme]);

  useEffect(() => {
    //force sort refresh on new data
    gridRef?.current?.instance.columnOption("total", {
      sortOrder: "asc",
      sortIndex: 0,
    });
  }, [timings]);

  const timingCellRenderer = useCallback(
    ({
      time,
      status,
      skis,
    }: {
      time: SkiFormattedTime | null;
      status: MStatus | null;
      skis: string;
    }) => (
      <div>
        <p style={{ margin: 0, padding: 0 }}>
          {status || formatTimeForDx(time as SkiFormattedTime)}
        </p>
        {skis && (
          <p
            style={{
              fontStyle: "italic",
              fontSize: "80%",
              margin: 0,
              padding: 0,
              color: "gray",
            }}
          >
            {skis}
          </p>
        )}
      </div>
    ),
    []
  );

  if (!session.id) return <Loader />;

  return (
    <>
      <DataGrid<Timing>
        dataSource={timings}
        allowColumnResizing
        columnResizingMode="widget"
        rowAlternationEnabled
        showBorders
        width={"100vw"}
        ref={gridRef}
        keyExpr="id"
        onRowClick={(e) => {
          setSelectedRowData(e.data);
          setShowCreateTimingModal(true);
        }}
      >
        <Selection mode={"single"} />
        <Scrolling showScrollbar />

        <Column
          dataField="rank"
          caption="#"
          width={30}
          alignment="center"
          cellRender={(e) => e.rowIndex + 1}
        />
        <Column
          dataField={"athleteName"}
          caption="Coureur"
          minWidth={session.mode === "TRAINING" ? 100 : "auto"}
        />
        <Column
          dataField={"m1"}
          caption={"1"}
          alignment={"right"}
          cellRender={({ data }: { data: Timing }) =>
            timingCellRenderer({
              skis: data.m1Skis || "",
              status: data.m1Status || null,
              time: data.m1,
            })
          }
          calculateSortValue={(e: Timing) => {
            if (e.m1Status || !e.m1) return 100_000_000_000_000;
            return strToMillisec(e.m1);
          }}
          width={70}
        />
        <Column
          dataField={"m2"}
          caption={"2"}
          alignment={"right"}
          calculateSortValue={(e: Timing) => {
            if (e.m2Status || !e.m2) return 100_000_000_000_000;
            return strToMillisec(e.m2);
          }}
          cellRender={({ data }: { data: Timing }) =>
            timingCellRenderer({
              skis: data.m2Skis || "",
              status: data.m2Status || null,
              time: data.m2,
            })
          }
          width={70}
        />
        <Column
          dataField={"m3"}
          caption={"3"}
          alignment={"right"}
          calculateSortValue={(e: Timing) => {
            if (e.m3Status || !e.m3) return 100_000_000_000_000;
            return strToMillisec(e.m3);
          }}
          cellRender={({ data }: { data: Timing }) =>
            timingCellRenderer({
              skis: data.m3Skis || "",
              status: data.m3Status || null,
              time: data.m3,
            })
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m4"}
          caption={"4"}
          alignment={"right"}
          calculateSortValue={(e: Timing) => {
            if (e.m4Status || !e.m4) return 100_000_000_000_000;
            return strToMillisec(e.m4);
          }}
          cellRender={({ data }: { data: Timing }) =>
            timingCellRenderer({
              skis: data.m4Skis || "",
              status: data.m4Status || null,
              time: data.m4,
            })
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m5"}
          caption={"5"}
          alignment={"right"}
          calculateSortValue={(e: Timing) => {
            if (e.m5Status || !e.m5) return 100_000_000_000_000;
            return strToMillisec(e.m5);
          }}
          cellRender={({ data }: { data: Timing }) =>
            timingCellRenderer({
              skis: data.m5Skis || "",
              status: data.m5Status || null,
              time: data.m5,
            })
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m6"}
          caption={"6"}
          alignment={"right"}
          calculateSortValue={(e: Timing) => {
            if (e.m6Status || !e.m6) return 100_000_000_000_000;
            return strToMillisec(e.m6);
          }}
          cellRender={({ data }: { data: Timing }) =>
            timingCellRenderer({
              skis: data.m6Skis || "",
              status: data.m6Status || null,
              time: data.m6,
            })
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m7"}
          caption={"7"}
          alignment={"right"}
          calculateSortValue={(e: Timing) => {
            if (e.m7Status || !e.m7) return 100_000_000_000_000;
            return strToMillisec(e.m7);
          }}
          cellRender={({ data }: { data: Timing }) =>
            timingCellRenderer({
              skis: data.m7Skis || "",
              status: data.m7Status || null,
              time: data.m7,
            })
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m8"}
          caption={"8"}
          alignment={"right"}
          calculateSortValue={(e: Timing) => {
            if (e.m8Status || !e.m8) return 100_000_000_000_000;
            return strToMillisec(e.m8);
          }}
          cellRender={({ data }: { data: Timing }) =>
            timingCellRenderer({
              skis: data.m8Skis || "",
              status: data.m8Status || null,
              time: data.m8,
            })
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        {session.mode === "RACE" && (
          <Column
            dataField="total"
            caption="Tot."
            defaultSortIndex={0}
            defaultSortOrder="asc"
            sortOrder={"asc"}
            sortIndex={0}
            alignment="right"
            visible={session.mode === "RACE"}
            width={100}
            calculateSortValue={({
              m1,
              m2,
              m1Status,
              m2Status,
            }: {
              m1: SkiFormattedTime;
              m2: SkiFormattedTime;
              m1Status: Timing["m1Status"];
              m2Status: Timing["m2Status"];
            }) => {
              if (m1Status || m2Status || !m1 || !m2) {
                return 100_000_000_000_000;
              } else {
                return addTimes(m1, m2);
              }
            }}
            calculateDisplayValue={({
              m1,
              m2,
              m1Status,
              m2Status,
            }: {
              m1: SkiFormattedTime;
              m2: SkiFormattedTime;
              m1Status: Timing["m1Status"];
              m2Status: Timing["m2Status"];
            }) => {
              if (m1Status) return m1Status;
              if (m2Status) return m2Status;
              if (!m1 || !m2) return "-";
              return millisecToSkiFormat(addTimes(m1, m2));
            }}
          />
        )}
      </DataGrid>
      <Space h={"xl"} />
      <Group position="right" style={{ marginRight: "15px" }}>
        <Button onClick={() => refetchTimings()} leftIcon={<IconRefresh />}>
          Rafraichir
        </Button>
        <Button
          color={"green"}
          onClick={() => {
            setSelectedRowData(null);
            setShowCreateTimingModal(true);
          }}
          leftIcon={<IconPlaylistAdd />}
        >
          Ajouter
        </Button>
      </Group>
      <TimingFormModal
        session={session}
        opened={showCreateTimingModal}
        onClose={() => {
          setShowCreateTimingModal(!showCreateTimingModal);
          setSelectedRowData(null);
        }}
        isEdit={!!selectedRowData?.sessionId}
        initialValues={
          !!selectedRowData?.sessionId
            ? { ...selectedRowData, id: selectedRowData.id }
            : undefined
        }
      />
    </>
  );
};

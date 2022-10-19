import React, { useEffect, useRef, useState } from "react";
import DataGrid, {
  Column,
  Grouping,
  Scrolling,
  Selection,
} from "devextreme-react/data-grid";
import {
  addTimes,
  formatTimeForDx,
  millisecToSkiFormat,
} from "../helpers/times";
import { SkiFormattedTime } from "../types";
import { useTimingsBySessionId, Timing } from "api/timings-api";
import { Session } from "api/session-api";
import { Button, Group, Loader, Space } from "@mantine/core";
import { TimingFormModal } from "./TimingForm/TimingFormModal";

type Props = {
  session: Session;
};

export const SessionDatagrid = ({ session }: Props) => {
  const [showCreateTimingModal, setShowCreateTimingModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Timing | null>(null);
  const { data: timings } = useTimingsBySessionId(session.id);

  const gridRef = useRef<DataGrid>(null);

  useEffect(() => {
    //force sort refresh on new data
    gridRef?.current?.instance.columnOption("total", {
      sortOrder: "asc",
      sortIndex: 0,
    });
  }, [timings]);

  if (!session.id) return <Loader />;

  return (
    <>
      <DataGrid<Timing>
        dataSource={timings}
        rowAlternationEnabled
        showBorders
        columnAutoWidth
        width={"100vw"}
        ref={gridRef}
        keyExpr="id"
        onRowClick={(e) => {
          setSelectedRowData(e.data);
          setShowCreateTimingModal(true);
        }}
      >
        <Grouping autoExpandAll={false} />
        <Selection mode={"single"} />
        <Scrolling showScrollbar />

        <Column
          dataField="rank"
          caption="#"
          width={30}
          alignment="center"
          cellRender={(e) => e.rowIndex + 1}
          // fixed={session.mode === "TRAINING"}
          // fixedPosition={session.mode === "TRAINING" && "left"}
        />
        <Column
          caption="Coureur"
          dataField={"athleteName"}
          fixed={session.mode === "TRAINING"}
          fixedPosition={session.mode === "TRAINING" && "left"}
        />
        <Column
          dataField={"m1"}
          caption={"1"}
          alignment={"right"}
          calculateDisplayValue={(props: Timing) =>
            props.m1Status || formatTimeForDx(props.m1 as SkiFormattedTime)
          }
          width={70}
        />
        <Column
          dataField={"m2"}
          caption={"2"}
          alignment={"right"}
          calculateDisplayValue={(props: Timing) =>
            props.m2Status || formatTimeForDx(props.m2 as SkiFormattedTime)
          }
          width={70}
        />
        <Column
          dataField={"m3"}
          caption={"3"}
          alignment={"right"}
          calculateDisplayValue={(props: Timing) =>
            props.m3Status || formatTimeForDx(props.m3 as SkiFormattedTime)
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m4"}
          caption={"4"}
          alignment={"right"}
          calculateDisplayValue={(props: Timing) =>
            props.m4Status || formatTimeForDx(props.m4 as SkiFormattedTime)
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m5"}
          caption={"5"}
          alignment={"right"}
          calculateDisplayValue={(props: Timing) =>
            props.m5Status || formatTimeForDx(props.m5 as SkiFormattedTime)
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m6"}
          caption={"6"}
          alignment={"right"}
          calculateDisplayValue={(props: Timing) =>
            props.m6Status || formatTimeForDx(props.m6 as SkiFormattedTime)
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m7"}
          caption={"7"}
          alignment={"right"}
          calculateDisplayValue={(props: Timing) =>
            props.m7Status || formatTimeForDx(props.m7 as SkiFormattedTime)
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
        <Column
          dataField={"m8"}
          caption={"8"}
          alignment={"right"}
          calculateDisplayValue={(props: Timing) =>
            props.m8Status || formatTimeForDx(props.m8 as SkiFormattedTime)
          }
          width={70}
          visible={session.mode === "TRAINING"}
        />
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
            if (!m1 || !m2) return "DNS";
            return millisecToSkiFormat(addTimes(m1, m2));
          }}
        />
      </DataGrid>
      <Space h={"xl"} />
      <Group position="right" style={{ marginRight: "15px" }}>
        <Button
          onClick={() => {
            setSelectedRowData(null);
            setShowCreateTimingModal(true);
          }}
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

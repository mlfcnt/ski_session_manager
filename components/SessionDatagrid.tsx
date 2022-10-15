import React, { useEffect, useRef, useState } from "react";
import DataGrid, {
  Column,
  Grouping,
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
import { Button, Group, Space } from "@mantine/core";
import { TimingFormModal } from "./TimingFormModal";

type Props = {
  sessionId: Session["id"];
};

export const SessionDatagrid = ({ sessionId }: Props) => {
  const [showCreateTimingModal, setShowCreateTimingModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<Timing | null>(null);
  const { data: timings } = useTimingsBySessionId(sessionId);

  const gridRef = useRef<DataGrid>(null);

  useEffect(() => {
    //force sort refresh on new data
    gridRef?.current?.instance.columnOption("total", {
      sortOrder: "asc",
      sortIndex: 0,
    });
  }, [timings]);

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

        <Column
          dataField="rank"
          caption="#"
          width={30}
          cellRender={(e) => e.rowIndex + 1}
        />
        <Column
          caption="Coureur"
          cellRender={({
            data: { athleteName, m1Skis, m2Skis },
          }: {
            data: {
              athleteName: Timing["athleteName"];
              m1Skis: Timing["m1Skis"];
              m2Skis: Timing["m2Skis"];
            };
          }) => (
            <div>
              <span>{athleteName}</span>{" "}
              {(m1Skis || m2Skis) && (
                <span style={{ color: "grey", fontStyle: "italic" }}>
                  | skis : {m1Skis} - {m2Skis}
                </span>
              )}
            </div>
          )}
        />
        <Column
          dataField="m1"
          caption="1"
          alignment={"right"}
          calculateDisplayValue={({ m1 }: { m1: SkiFormattedTime }) =>
            formatTimeForDx(m1)
          }
        />
        <Column
          dataField="m2"
          caption="2"
          alignment={"right"}
          calculateDisplayValue={({ m2 }: { m2: SkiFormattedTime }) =>
            formatTimeForDx(m2)
          }
        />
        <Column
          dataField="total"
          caption="Tot."
          defaultSortIndex={0}
          defaultSortOrder="asc"
          sortOrder={"asc"}
          sortIndex={0}
          alignment="right"
          calculateSortValue={({
            m1,
            m2,
          }: {
            m1: SkiFormattedTime;
            m2: SkiFormattedTime;
          }) => {
            if (!m1 || !m2) return 1000;
            return millisecToSkiFormat(addTimes(m1, m2));
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
            if (m2Status) return m1Status;
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
        sessionId={sessionId}
        opened={showCreateTimingModal}
        onClose={() => {
          setShowCreateTimingModal(!showCreateTimingModal);
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

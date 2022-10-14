import React, { useState } from "react";
import DataGrid, { Column, Grouping } from "devextreme-react/data-grid";
import { addTimes, millisecToSkiFormat } from "../helpers/times";
import { SkiFormattedTime } from "../types";
import { useTimingsBySessionId, Timing } from "api/timings-api";
import { Session } from "api/session-api";
import { Button, Group, Space } from "@mantine/core";
import { CreateTimingFormModal } from "./CreateTimingFormModal";

type Props = {
  sessionId: Session["id"];
};

export const SessionDatagrid = ({ sessionId }: Props) => {
  const [showCreateTimingModal, setShowCreateTimingModal] = useState(false);
  const { data: timings } = useTimingsBySessionId(sessionId);

  return (
    <>
      <DataGrid<Timing>
        dataSource={timings}
        rowAlternationEnabled
        showBorders
        columnAutoWidth
        width={"100vw"}
      >
        <Grouping autoExpandAll={false} />

        <Column
          dataField="rank"
          caption="#"
          width={30}
          cellRender={(e) => e.rowIndex + 1}
        />
        <Column
          caption="Coureur"
          calculateDisplayValue={({
            athleteName,
          }: {
            athleteName: Timing["athleteName"];
          }) => athleteName}
        />
        <Column dataField="m1" caption="1" />
        <Column dataField="m2" caption="2" />
        <Column
          dataField="total"
          caption="Tot."
          defaultSortIndex={0}
          defaultSortOrder="asc"
          calculateSortValue={({
            m1,
            m2,
          }: {
            m1: SkiFormattedTime;
            m2: SkiFormattedTime;
          }) => {
            if (!m2) return null;
            return millisecToSkiFormat(addTimes(m1, m2));
          }}
          calculateDisplayValue={({
            m1,
            m2,
          }: {
            m1: SkiFormattedTime;
            m2: SkiFormattedTime;
          }) => {
            if (!m2) return null;
            return millisecToSkiFormat(addTimes(m1, m2));
          }}
        />
      </DataGrid>
      <Space h={"xl"} />
      <Group position="right" style={{ marginRight: "20px" }}>
        <Button onClick={() => setShowCreateTimingModal(true)}>Ajouter</Button>
      </Group>
      <CreateTimingFormModal
        sessionId={sessionId}
        opened={showCreateTimingModal}
        onClose={() => setShowCreateTimingModal(!showCreateTimingModal)}
      />
    </>
  );
};

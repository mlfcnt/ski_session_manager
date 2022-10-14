import React from "react";
import DataGrid, {
  Column,
  Grouping,
  Editing,
  Form,
} from "devextreme-react/data-grid";
import { SimpleItem, GroupItem } from "devextreme-react/form";
import { addTimes, millisecToSkiFormat } from "../helpers/times";
import { SkiFormattedTime } from "../types";
import { calculateRank } from "../helpers/rank";
import { SelectAthlete } from "./Selects/SelectAthlete";
import { useTimingsBySessionId, Timing } from "api/timings-api";
import { Session } from "api/session-api";
import { CreateSessionForm } from "./CreateSessionForm";
import { Popup } from "devextreme-react";

type Props = {
  sessionId: Session["id"];
};

export const SessionDatagrid = ({ sessionId }: Props) => {
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
        <Editing mode="popup" allowAdding allowDeleting allowUpdating useIcons>
          <Popup
            title="Employee Info"
            showTitle={true}
            width={700}
            height={525}
          />
          <Form>
            <GroupItem>
              <SimpleItem
                dataField="athleteId"
                render={() => <SelectAthlete />}
                isRequired
              />
            </GroupItem>
            <GroupItem caption="Temps">
              <SimpleItem
                dataField="m1"
                label={{
                  text: "Manche 1",
                }}
                helpText={"Format m.ss.cc ex: 1.00.00"}
                validationRules={[
                  {
                    type: "pattern",
                    pattern: /\d\.\d\d\.\d\d/,
                    message: "Le format n'est pas le bon",
                  },
                ]}
              />
              <SimpleItem
                dataField="m2"
                label={{
                  text: "Manche 2",
                }}
                helpText={"Format m.ss.cc ex: 1.00.00"}
                validationRules={[
                  {
                    type: "pattern",
                    pattern: /\d\.\d\d\.\d\d/,
                    message: "Le format n'est pas le bon",
                  },
                ]}
              />
            </GroupItem>
          </Form>
        </Editing>

        <Column
          dataField="rank"
          caption="#"
          width={30}
          defaultSortIndex={0}
          defaultSortOrder="asc"
          calculateSortValue={({
            id,
          }: {
            m1: SkiFormattedTime;
            m2: SkiFormattedTime;
            id: number;
          }) => calculateRank(id, timings, true)}
          calculateDisplayValue={({
            id,
          }: {
            m1: SkiFormattedTime;
            m2: SkiFormattedTime;
            id: number;
          }) => calculateRank(id, timings)}
        />
        <Column
          dataField="athleteId"
          caption="Coureur"
          calculateDisplayValue={({
            athleteFullName,
          }: {
            athleteFullName: Timing["athleteName"];
          }) => athleteFullName}
        />
        <Column dataField="m1" caption="1" />
        <Column dataField="m2" caption="2" />
        <Column
          dataField="total"
          caption="Tot."
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
    </>
  );
};

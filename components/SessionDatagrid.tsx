import React from "react";
import DataGrid, {
  Column,
  Grouping,
  Editing,
  Form,
} from "devextreme-react/data-grid";
import { SimpleItem, GroupItem } from "devextreme-react/form";
import { addTimes, millisecToSkiFormat } from "../helpers/times";
import { Timing } from "../types";
import { calculateRank, Record } from "../helpers/rank";
import { SelectAthlete } from "./Selects/SelectAthlete";

export const SessionDatagrid = () => {
  const timings: Record[] = [
    {
      id: 1,
      athleteId: 1,
      athleteFullname: "Tommy Martin",
      m1: "1.00.00",
      m2: "1.10.00",
    },
    {
      id: 2,
      athleteId: 2,
      athleteFullname: "Nina Martin",
      m1: "1.10.00",
      m2: "1.20.00",
    },
  ];
  return (
    <>
      <DataGrid<Record>
        dataSource={timings}
        rowAlternationEnabled
        showBorders
        columnAutoWidth
        width={"100vw"}
      >
        <Grouping autoExpandAll={false} />
        <Editing mode="form" allowAdding allowDeleting allowUpdating>
          <Form>
            <GroupItem caption="Coureur">
              <SimpleItem
                dataField="athleteId"
                render={(id) => <SelectAthlete />}
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
            m1: Timing;
            m2: Timing;
            id: number;
          }) => calculateRank(id, timings)}
          calculateDisplayValue={({
            id,
          }: {
            m1: Timing;
            m2: Timing;
            id: number;
          }) => calculateRank(id, timings)}
        />
        <Column
          dataField="athleteId"
          caption="Coureur"
          calculateDisplayValue={({
            athleteFullname,
          }: {
            athleteFullname: Record["athleteFullname"];
          }) => {
            return athleteFullname;
          }}
        />
        <Column dataField="m1" caption="1" />
        <Column dataField="m2" caption="2" />
        <Column
          dataField="total"
          caption="Tot."
          calculateDisplayValue={({ m1, m2 }: { m1: Timing; m2: Timing }) =>
            millisecToSkiFormat(addTimes(m1, m2))
          }
        />
      </DataGrid>
    </>
  );
};

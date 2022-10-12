import React from "react";
import DataGrid, {
  Column,
  Grouping,
  Editing,
} from "devextreme-react/data-grid";

export const SessionDatagrid = () => {
  const fakeRows = [
    {
      rank: 1,
      fullname: "Tommy Martin",
      m1: "01.00.00",
      m2: "01.10.00",
      total: "02.10.00",
    },
    {
      rank: 2,
      fullname: "Nina Martin",
      m1: "01.10.00",
      m2: "01.20.00",
      total: "02.30.00",
    },
  ];
  return (
    <DataGrid
      dataSource={fakeRows}
      rowAlternationEnabled
      showBorders
      columnAutoWidth
      width={"100vw"}
    >
      <Grouping autoExpandAll={false} />
      <Editing mode="cell" allowAdding allowDeleting allowUpdating />

      <Column dataField="rank" caption="#" width={30} allowEditing={false} />
      <Column dataField="fullname" caption="Coureur" />
      <Column dataField="m1" caption="1" />
      <Column dataField="m2" caption="2" />
      <Column dataField="total" caption="Tot." allowEditing={false} />
    </DataGrid>
  );
};

import React from 'react';

export interface Trow {
  rowData: { [x: string]: string | number };
}

const TableRow = ({ rowData }: Trow) => {
  const tableData = Object.values(rowData).map(data => <td>{data}</td>);

  return <tr>{tableData}</tr>;
};

export default TableRow;

import React from 'react';
import { StarShipFiltered } from '../../interfaces/starship';

export interface Trow {
  rowData: StarShipFiltered;
}

const TableRow = ({ rowData }: Trow) => {
  const tableData = Object.values(rowData).map(data => <td>{data}</td>);

  return <tr>{tableData}</tr>;
};

export default TableRow;

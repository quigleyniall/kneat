import React from 'react';
import { StarShipFiltered, FilmFiltered } from '../../interfaces';

export interface Trow {
  rowData: StarShipFiltered | FilmFiltered;
}

const TableRow = ({ rowData }: Trow) => {
  const tableData = Object.values(rowData).map((data, index) => (
    <td key={index}>{data}</td>
  ));

  return <tr>{tableData}</tr>;
};

export default TableRow;

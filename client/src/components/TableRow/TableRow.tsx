import React from 'react';

const TableRow = ({ rowData }) => {
  const tableData = Object.values(rowData).map(data => <td>{data}</td>);

  return <tr>{tableData}</tr>;
};

export default TableRow;

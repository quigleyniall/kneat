import React from 'react';
import { format } from '../../utils/formatText';
import './Table.scss';

const TableWrapper = ({ children, headers, sortResult }) => (
  <table>
    <thead>
      <tr>
        {Object.keys(headers).map(heading => (
          <th onClick={() => sortResult(heading)}>{format(heading)}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default TableWrapper;

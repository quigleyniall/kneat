import React from 'react';
import { format } from '../../utils/formatText';
import './Table.scss';

interface IProps {
  children: React.ReactNode;
  headers: { [x: string]: string | number };
  sortResult: (name: string) => void;
}

const TableWrapper = ({ children, headers, sortResult }: IProps) => (
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

import React from 'react';
import { format } from '../../utils/formatText';
import './Table.scss';
import { StarShipFiltered, FilmFiltered } from '../../interfaces';

interface IProps {
  children: React.ReactNode;
  headers: StarShipFiltered | FilmFiltered;
  sortResult: (name: string) => void;
}

const TableWrapper = ({ children, headers, sortResult }: IProps) => (
  <table>
    <thead>
      <tr>
        {Object.keys(headers).map((heading, index) => (
          <th
            onClick={() => sortResult(heading)}
            key={index}
            data-test="table-header"
          >
            {format(heading)}
          </th>
        ))}
      </tr>
    </thead>
    <tbody data-test="table-children">{children}</tbody>
  </table>
);

export default TableWrapper;

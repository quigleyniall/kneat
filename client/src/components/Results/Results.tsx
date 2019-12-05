import React from 'react';
import './Results.scss';

interface Props {
  starShip: any;
}

const Results = ({ starShip }: Props) => (
  <div className="result">
    <div>Name: {starShip.name}</div>
    <div>Model: {starShip.model}</div>
    <div>MGLT: {starShip.MGLT}</div>
    <div>Consumables: {starShip.consumables}</div>
    <div>
      {starShip.number_of_resupplies
        ? `Number of Resupplies: ${starShip.number_of_resupplies}`
        : null}
    </div>
  </div>
);

export default Results;

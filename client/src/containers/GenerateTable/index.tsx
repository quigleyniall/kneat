import { generateTable } from './GenerateTable';
import {
  starShipNummericalColumns,
  filmNummericalColumns,
  peopleNummericalColumns,
  speciesNummericalColumns,
  vehicleNummericalColumns
} from '../../utils/tableHelper';

export const StarShip = generateTable(
  '/starships',
  'starShip',
  starShipNummericalColumns,
  'name',
  {
    searchBtnText: 'Search Star Ships',
    header: 'Star Ships'
  }
);

export const Films = generateTable(
  '/films',
  'film',
  filmNummericalColumns,
  'title',
  {
    searchBtnText: 'Search Films',
    header: 'Films'
  }
);

export const People = generateTable(
  '/people',
  'people',
  peopleNummericalColumns,
  'name',
  { searchBtnText: 'Search People', header: 'People' }
);

export const Species = generateTable(
  '/species',
  'species',
  speciesNummericalColumns,
  'name',
  { searchBtnText: 'Search Species', header: 'Species' }
);

export const Vehicles = generateTable(
  '/vehicles',
  'vehicle',
  vehicleNummericalColumns,
  'name',
  { searchBtnText: 'Search Vehicles', header: 'Vehicles' }
);

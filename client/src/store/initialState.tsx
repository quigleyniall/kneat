import {
  filmFilterKeys,
  peopleFilterKeys,
  speciesFilterKeys,
  starShipFilterKeys,
  vehicleFilterKeys,
  starShipAnalysisFilterKeys
} from '../utils/tableHelper';

export const initialState = {
  film: {
    allData: [],
    filteredData: [],
    lastSorted: '',
    activeDataKeys: [
      'title',
      'episode_id',
      'director',
      'producer',
      'release_date'
    ],
    allResponseKeys: filmFilterKeys,
    searchTerm: '',
    loading: false
  },
  people: {
    allData: [],
    filteredData: [],
    lastSorted: '',
    activeDataKeys: peopleFilterKeys,
    allResponseKeys: peopleFilterKeys,
    searchTerm: '',
    loading: false
  },
  species: {
    allData: [],
    filteredData: [],
    lastSorted: '',
    activeDataKeys: speciesFilterKeys,
    allResponseKeys: speciesFilterKeys,
    searchTerm: '',
    loading: false
  },
  starShip: {
    allData: [],
    filteredData: [],
    lastSorted: '',
    activeDataKeys: ['name', 'model', 'consumables', 'MGLT'],
    allResponseKeys: starShipFilterKeys,
    searchTerm: '',
    loading: false
  },
  vehicle: {
    allData: [],
    filteredData: [],
    lastSorted: '',
    activeDataKeys: vehicleFilterKeys,
    allResponseKeys: vehicleFilterKeys,
    searchTerm: '',
    loading: false
  },
  starShipAnalysis: {
    allData: [],
    filteredData: [],
    lastSorted: '',
    activeDataKeys: [
      'name',
      'model',
      'consumables',
      'MGLT',
      'number_of_resupplies'
    ],
    allResponseKeys: starShipAnalysisFilterKeys,
    distance: '',
    loading: false
  }
};

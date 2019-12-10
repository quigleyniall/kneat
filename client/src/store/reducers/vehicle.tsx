import { ActionTypes, Action } from '../actions';
import {
  vehicleFilterKeys,
  filterObjectKeysInArray
} from '../../utils/tableHelper';
import { VehicleResponse, VehicleFiltered } from '../../interfaces';

export interface Vehicle {
  allVehicleData: VehicleResponse[];
  filteredVehicleData: VehicleFiltered[];
  lastSorted: string;
  activeDataKeys: string[];
  allResponseKeys: string[];
  searchTerm: string;
}

export const initialState = {
  allVehicleData: [],
  filteredVehicleData: [],
  lastSorted: '',
  activeDataKeys: vehicleFilterKeys,
  allResponseKeys: vehicleFilterKeys,
  searchTerm: ''
};

const Vehicle = (state: Vehicle = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.makeVehicleApiCall:
      return {
        ...state,
        allVehicleData: action.payload,
        filteredVehicleData: filterObjectKeysInArray(
          action.payload,
          state.activeDataKeys
        )
      };

    case ActionTypes.searchVehicleChange:
      return { ...state, searchTerm: action.payload };

    case ActionTypes.findVehicleMatches:
      return {
        ...state,
        filteredVehicleData: filterObjectKeysInArray(
          state.allVehicleData.filter(Vehicle =>
            Vehicle.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          ),
          state.activeDataKeys
        )
      };

    case ActionTypes.clearVehicleSearch:
      return {
        ...state,
        filteredVehicleData: filterObjectKeysInArray(
          state.allVehicleData,
          state.activeDataKeys
        ),
        searchTerm: ''
      };

    case ActionTypes.changeVehicleTableHeaders:
      return {
        ...state,
        filteredVehicleData:
          state.searchTerm.length > 0
            ? filterObjectKeysInArray(
                state.allVehicleData.filter(Vehicle =>
                  Vehicle.name
                    .toLowerCase()
                    .includes(state.searchTerm.toLowerCase())
                ),
                action.newActiveKeys
              )
            : action.filteredData,
        activeDataKeys: action.newActiveKeys
      };

    case ActionTypes.sortVehicleData:
      return {
        ...state,
        filteredVehicleData: action.sortedArray,
        lastSorted: action.lastSorted
      };

    default:
      return state;
  }
};

export default Vehicle;

export const filterObjectKeysInArray = (
  fullResponse: any[],
  keysToFilter: string
) =>
  fullResponse.map(response => {
    return Object.keys(response)
      .filter(key => keysToFilter.includes(key))
      .reduce((obj, key) => {
        obj[key] = response[key];
        return obj;
      }, {});
  });

export const starShipNummericallyColumns = [
  'MGLT',
  'cost_in_credits',
  'number_of_resupplies',
  'length',
  'max_atmosphering_speed',
  'crew',
  'passengers',
  'cargo_capacity',
  'hyperdrive_rating'
];

export const starShipFilterKeys = [
  'name',
  'model',
  'manufacturer',
  'cost_in_credits',
  'length',
  'max_atmosphering_speed',
  'crew',
  'passengers',
  'cargo_capacity',
  'consumables',
  'hyperdrive_rating',
  'MGLT',
  'starship_class',
  'number_of_resupplies'
];

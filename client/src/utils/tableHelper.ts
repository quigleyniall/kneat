export const filterObjectKeysInArray = (
  fullResponse: any[],
  keysToFilter: string[]
) =>
  fullResponse.map(response => {
    return Object.keys(response)
      .filter(key => keysToFilter.includes(key))
      .reduce((obj: any, key: string) => {
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

export const starShipAnalysisFilterKeys = [
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
  'starship_class'
];

export const filmNummericalColumns = ['episode_id'];

export const filmFilterKeys = [
  'title',
  'episode_id',
  'opening_crawl',
  'director',
  'producer',
  'release_date'
];

export const speciesFilterKeys = [
  'name',
  'classification',
  'designation',
  'average_height',
  'skin_colors',
  'hair_colors',
  'eye_colors',
  'average_lifespan',
  'language'
];

export const vehicleFilterKeys = [
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
  'vehicle_class'
];

export const peopleFilterKeys = [
  'name',
  'height',
  'mass',
  'hair_color',
  'skin_color',
  'eye_color',
  'birth_year',
  'gender'
];

import { checkTimeToResupply } from './resupply';

export const sortAlphabetically = (array, objectKey) =>
  array.sort((a, b) => {
    if (a[objectKey].toLowerCase() < b[objectKey].toLowerCase()) {
      return -1;
    }
    if (a[objectKey].toLowerCase() > b[objectKey].toLowerCase()) {
      return 1;
    }
    return 0;
  });

export const sortNummerically = (array, objectKey) =>
  array.sort((a, b) => {
    if (b[objectKey] === 'unknown' || b[objectKey] === 'n/a') {
      return -1;
    }

    return a[objectKey] - b[objectKey];
  });

export const sortConsumables = (array, objectKey) => {
  array.sort((a, b) => {
    if (b[objectKey] === 'unknown') {
      return -1;
    }

    if (a[objectKey] === 'unknown') {
      return 1;
    }

    return (
      checkTimeToResupply(a[objectKey]) - checkTimeToResupply(b[objectKey])
    );
  });
};

// export const sortConsumables = (array, objectKey) => {
//   const sortBy = [
//     'hour',
//     'hours',
//     'day',
//     'days',
//     'week',
//     'weeks',
//     'month',
//     'months',
//     'year',
//     'years',
//     'unknown'
//   ];
//   const sortByObject = createSortByObject(sortBy);
//   const sortByString = customSort(array, objectKey, sortByObject);
//   const sortByStringAndNumber = finalSort(
//     sortByString,
//     objectKey,
//     sortByObject
//   );
//   return sortByStringAndNumber;
// };

export const createSortByObject = sortBy => {
  const sortByObject = sortBy.reduce(
    (obj, item, index) => ({
      ...obj,
      [item]: index
    }),
    {}
  );
  return sortByObject;
};

export const customSort = (array, objectKey, sortByObject) => {
  return array.sort((a, b) => {
    const timePeriodA = a[objectKey].split(' ');
    const timePeriodB = b[objectKey].split(' ');

    if (sortByObject[timePeriodA[1]] < sortByObject[timePeriodB[1]]) {
      return -1;
    }

    if (sortByObject[timePeriodA[1]] > sortByObject[timePeriodB[1]]) {
      return 1;
    }

    if (timePeriodB[0] === 'unknown') {
      return -1;
    }

    return 0;
  });
};

export const finalSort = (array, objectKey, sortByObject) => {
  return array.sort((a, b) => {
    const timePeriodA = a[objectKey].split(' ');
    const timePeriodB = b[objectKey].split(' ');

    if (sortByObject[timePeriodA[1]] === sortByObject[timePeriodB[1]]) {
      return timePeriodA[0] - timePeriodB[0];
    }

    return 0;
  });
};

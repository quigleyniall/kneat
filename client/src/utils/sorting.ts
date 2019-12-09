export const sortNummerically = (array: any[], objectKey: string) =>
  array.sort((a, b) => {
    if (b[objectKey] === 'unknown' || b[objectKey] === 'n/a') {
      return -1;
    }

    return a[objectKey] - b[objectKey];
  });

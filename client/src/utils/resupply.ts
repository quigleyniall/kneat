export const checkTimeToResupply = (consumable: string) => {
  const timeArray = consumable.split(' ');
  const timeString = timeArray[1];
  let hoursToResupply = 0;

  if (timeString.includes('hour')) {
    hoursToResupply = 1;
  }
  if (timeString.includes('day')) {
    hoursToResupply = 24;
  }
  if (timeString.includes('week')) {
    hoursToResupply = 24 * 7;
  }
  if (timeString.includes('month')) {
    hoursToResupply = 24 * 30;
  }
  if (timeString.includes('year')) {
    hoursToResupply = 24 * 365;
  }

  return hoursToResupply * +timeArray[0];
};

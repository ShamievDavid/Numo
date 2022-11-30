export const getDateFromString = stringDate => {
  const [day, month, year] = stringDate.split('/');
  return new Date(+year, month - 1, +day);
};

export const getFormattedDateString = () => {
  const today = new Date();

  return [
    padTo2Digits(today.getDate()),
    padTo2Digits(today.getMonth() + 1),
    today.getFullYear(),
  ].join('/');
};

const padTo2Digits = num => num.toString().padStart(2, '0');

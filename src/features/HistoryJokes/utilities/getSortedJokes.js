export const getSortedJokes = jokes =>
  Object.keys(jokes)
    .sort((a, b) => getDate(b) - getDate(a))
    .reduce((res, key) => ((res[key] = jokes[key]), res), {});

export const getDate = stringDate => {
  const [day, month, year] = stringDate.split('/');
  return new Date(+year, month - 1, +day);
};

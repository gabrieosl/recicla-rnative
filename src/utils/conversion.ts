export const paperToGram = (numberOfPaper: number): number => {
  return numberOfPaper * 4.69;
};

export const gramToPaper = (grams: number): number => {
  return grams / 4.69;
};

export const gramsToTrees = (grams: number): number => {
  return grams / 58823.52941;
};

export const gramsToWater = (grams: number): number => {
  return (grams / 4.69) * 9.1689499083105;
};

export const gramsToCarbonCredit = (grams: number): number => {
  return (gramToPaper(grams) * 10) / 22000;
};

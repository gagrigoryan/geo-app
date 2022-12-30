export const getFormattedNumber = (
  floatNumber: number,
  fixed: number = 2
): string => {
  return floatNumber.toFixed(fixed);
};

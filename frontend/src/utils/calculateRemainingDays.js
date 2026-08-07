export const calculateRemainingDays = (expirDate) => {
  const expiry = new Date(expirDate);
  const today = new Date();

  expiry.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const difference = expiry - today;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
};

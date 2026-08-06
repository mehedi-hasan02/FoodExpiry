export const calculateRemainingDays = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diff = expiry - today;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const getExpiryStatus = (expiryDate) => {
  const days = calculateRemainingDays(expiryDate);

  if (days < 0) return "Expired";
  if (days < 3) return "Expiring Soon";

  return "Fresh";
};

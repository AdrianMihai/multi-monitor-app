export const generateRandomRecentDate = () => {
  const currentDate = new Date();

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    Math.floor(Math.random() * 28),
    Math.floor(Math.random() * 23),
    Math.floor(Math.random() * 59),
    Math.floor(Math.random() * 59)
  );
};

exports.generateCronExpression = (day, time) => {
  const daysOfWeek = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  const [hour, minute] = time.split(':').map(Number);
  const dayOfWeek = daysOfWeek[day.toLowerCase()];
  if (day) {
    if (dayOfWeek === undefined) {
      throw new Error(
        'Invalid day name. Use full weekday name (e.g., "Monday").'
      );
    }
    return `${minute} ${hour} * * ${dayOfWeek}`;
  }
  return `${minute} ${hour} * * *`;
};

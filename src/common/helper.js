const { Parser } = require('json2csv');

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

exports.generateCSVBuffer = (data) => {
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    const buffer = Buffer.from(csv, 'utf-8');
    return buffer;
  } catch (error) {
    console.error('Error generating CSV:', error);
    throw error;
  }
};
exports.formatDate = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0];
};

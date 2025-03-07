const moment = require('moment');
const { addQueue } = require('../bull/queue');
const { SCHEDULE_JOB_QUEUE } = require('./constant');
const { generateCronExpression } = require('./helper');

exports.addDelayedJob = async (tDate, time, data) => {
  const targetDateTime = moment(
    `${tDate} ${time}`,
    'YYYY-MM-DD HH:mm'
  ).toDate();
  const delay = targetDateTime.getTime() - Date.now();

  if (delay <= 0) {
    throw new Error('Target time is in the past.');
  }
  await addQueue(SCHEDULE_JOB_QUEUE, 'oneTimeSchedule', data, null, delay);
};

exports.addDailyScheduleJob = async (endDate, time, data) => {
  const endTimestamp = new Date(`${endDate}T23:59:59Z`).getTime();
  const cronExp = generateCronExpression(time);
  await addQueue(
    SCHEDULE_JOB_QUEUE,
    'dailySchedule',
    data,
    cronExp,
    null,
    endTimestamp
  );
};

exports.addWeeklyScheduleJob = async (day, endDate, time, data) => {
  const endTimestamp = new Date(`${endDate}T23:59:59Z`).getTime();
  const cronExp = generateCronExpression(day, time);
  await addQueue(
    SCHEDULE_JOB_QUEUE,
    'weeklySchedule',
    data,
    cronExp,
    null,
    endTimestamp
  );
};

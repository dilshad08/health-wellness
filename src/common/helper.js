const moment = require('moment');
const { addQueue } = require('../bull/queue');
const { SCHEDULE_JOB_QUEUE } = require('./constant');

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

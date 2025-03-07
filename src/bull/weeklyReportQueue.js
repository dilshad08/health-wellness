const { WEEKLY_REPORT_QUEUE } = require('../common/constant');
const { addQueue } = require('./queue');

const weeklyReportQueue = async () => {
  await addQueue(WEEKLY_REPORT_QUEUE, 'generate-report');
};

module.exports = weeklyReportQueue();

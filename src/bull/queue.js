const { Queue } = require('bullmq');
const { redisConnection } = require('../config/redis');

const addQueue = async (
  queueName,
  jobName,
  data,
  cronExp,
  delay,
  endTimestamp
) => {
  const queue = new Queue(queueName, { connection: redisConnection });
  let repeat;
  if (cronExp) {
    repeat = { cron: cronExp };
    if (endTimestamp) {
      repeat = { ...repeat, endDate: endDate };
    }
    await queue.add(jobName, data, { repeat: repeat });
  } else if (delay) {
    await queue.add(jobName, data, {
      delay: delay,
      removeOnComplete: true,
      removeOnFail: true,
    });
  } else {
    await queue.add(jobName, data);
  }
  console.log(
    `Added ${jobName} job to queue ${queueName} for the data: ${JSON.stringify(
      data
    )}`
  );
  const jobs = await queue.getJobs(['waiting', 'active']);
};

module.exports = {
  addQueue,
};

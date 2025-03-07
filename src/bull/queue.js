const { Queue } = require('bullmq');
const { redisConnection } = require('../config/redis');
const { JobType } = require('../common/constant');

const addQueue = async (queueName, jobName, data, cronExp, delay) => {
  const queue = new Queue(queueName, { connection: redisConnection });
  if (cronExp) {
    await queue.add(jobName, data, { repeat: { cron: cronExp } });
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

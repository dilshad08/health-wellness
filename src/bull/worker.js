const { Worker } = require('bullmq');
const {
  WEEKLY_REPORT_QUEUE,
  SCHEDULE_JOB_QUEUE,
} = require('../common/constant');
const { redisConnection } = require('../config/redis');

// Schedular Worker
const schedularWorker = new Worker(
  SCHEDULE_JOB_QUEUE,
  async (job) => {
    console.log(`Processing job : ${job.name}, data: ${job.data}`);
  },
  { connection: redisConnection }
);

schedularWorker.on('completed', (job) => {
  console.log(`Job ${job.name} completed.`);
});
schedularWorker.on('failed', (job, err) => {
  console.log(`Job ${job.name} failed: ${err.message}`);
});

// Weekly Report Worker
const weeklyReportWorker = new Worker(
  WEEKLY_REPORT_QUEUE,
  async (job) => {
    console.log(`Processing job : ${job.name}, data: ${job.data}`);
  },
  { connection: redisConnection }
);

weeklyReportWorker.on('completed', (job) => {
  console.log(`Job ${job.name} completed.`);
});
weeklyReportWorker.on('failed', (job, err) => {
  console.log(`Job ${job.name} failed: ${err.message}`);
});

module.exports = {
  schedularWorker,
  weeklyReportWorker,
};

const { Worker } = require('bullmq');
const {
  WEEKLY_REPORT_QUEUE,
  SCHEDULE_JOB_QUEUE,
  WEEKLY_EMAIL_QUEUE,
} = require('../common/constant');
const { redisConnection } = require('../config/redis');
const { sendEmail } = require('../services/emailSerice');
const MedicineMetaData = require('../models/MedicineMetaData');
const { generateCSVBuffer } = require('../common/helper');
const { addQueue } = require('./queue');
const {
  getMedicationEmailTemplate,
} = require('../common/email-templates/medicationReminder');
const {
  getWeeklyReportEmailTemplate,
} = require('../common/email-templates/weeklyReport');

// Schedular Worker
const schedularWorker = new Worker(
  SCHEDULE_JOB_QUEUE,
  async (job) => {
    console.log(
      `Processing job : ${job.name}, data: ${JSON.stringify(
        JSON.stringify(job.data)
      )}`
    );
    const medicineMetaData = await MedicineMetaData.create({
      name: job.data.name,
      description: job.data.description,
      userId: job.data.userId,
      medicationId: job.data._id,
      time: job.data.time,
      scheduleType: job.data.scheduleType,
      date: new Date(),
      bullJobId: job.id,
    });
    await sendEmail(
      job.data.userEmail,
      'Medicine Reminder',
      getMedicationEmailTemplate(
        job.data.userName,
        job.data.name,
        `${process.env.BASE_URL}/api/v1/medications/update?id=${medicineMetaData._id}`
      )
    );
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
    console.log(
      `Processing job : ${job.name}, data: ${JSON.stringify(job.data)}`
    );
    job.data.map(async (user) => {
      await addQueue(WEEKLY_EMAIL_QUEUE, 'sendEmailReport', user);
    });
  },
  { connection: redisConnection }
);

weeklyReportWorker.on('completed', (job) => {
  console.log(`Job ${job.name} completed.`);
});
weeklyReportWorker.on('failed', (job, err) => {
  console.log(`Job ${job.name} failed: ${err.message}`);
});

// Weekly Email Worker
const weeklyEmailWorker = new Worker(
  WEEKLY_EMAIL_QUEUE,
  async (job) => {
    console.log(
      `Processing job : ${job.name}, data: ${JSON.stringify(job.data)}`
    );
    const csvBuffer = generateCSVBuffer(job.data.medicineMetaData);
    await sendEmail(
      job.data.email,
      'Health & Wellness | Weekly Report',
      getWeeklyReportEmailTemplate(job.data.name),
      'report.csv',
      csvBuffer
    );
  },
  { connection: redisConnection }
);

weeklyEmailWorker.on('completed', (job) => {
  console.log(`Job ${job.name} completed.`);
});
weeklyEmailWorker.on('failed', (job, err) => {
  console.log(`Job ${job.name} failed: ${err.message}`);
});

module.exports = {
  schedularWorker,
  weeklyReportWorker,
  weeklyEmailWorker,
};

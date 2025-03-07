const { ONE_TIME, DAILY, WEEKLY } = require('../common/constant');
const {
  addDelayedJob,
  addDailyScheduleJob,
  addWeeklyScheduleJob,
} = require('../common/schedular');

exports.createMedicationSchedular = async (data) => {
  try {
    switch (data.scheduleType) {
      case ONE_TIME:
        if (!data.startDate || !data.time) {
          throw new Error('startDate and time is required');
        }
        await addDelayedJob(data.startDate, data.time, data);
        break;

      case DAILY:
        if (!data.endDate || !data.time) {
          throw new Error('endDate and time is required');
        }
        await addDailyScheduleJob(data.endDate, data.time, data);
        break;

      case WEEKLY:
        if (!data.dayOfWeek || !data.endDate || !data.time) {
          throw new Error('dayOfWeek, endDate and time is required');
        }
        await addWeeklyScheduleJob(
          data.dayOfWeek,
          data.endDate,
          data.time,
          data
        );
        break;
      default:
        break;
    }
  } catch (error) {
    throw error;
  }
};

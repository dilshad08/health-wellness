const { ONE_TIME, DAILY, WEEKLY } = require('../common/constant');
const { addDelayedJob } = require('../common/helper');

exports.createMedicationSchedular = async (data) => {
  try {
    switch (data.scheduleType) {
      case ONE_TIME:
        if (!data.startDate || data.time) {
          throw new Error('Start date and time is required');
        }
        await addDelayedJob(data.startDate, data.time, data);
        break;

      case DAILY:
        break;

      case WEEKLY:
        break;

      default:
        break;
    }
  } catch (error) {
    throw error;
  }
};

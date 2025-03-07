const { WEEKLY_REPORT_QUEUE } = require('../common/constant');
const { formatDate } = require('../common/helper');
const User = require('../models/User');
const { addQueue } = require('./queue');

const weeklyReportQueue = async () => {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const users = await User.aggregate([
    {
      $lookup: {
        from: 'medicinemetadatas',
        localField: '_id',
        foreignField: 'userId',
        as: 'medicineMetaData',
      },
    },
    {
      $addFields: {
        medicineMetaData: {
          $filter: {
            input: '$medicineMetaData',
            as: 'meta',
            cond: { $gte: ['$$meta.date', startOfWeek] },
          },
        },
      },
    },
  ]);
  const transformedData = transformUsersWithMedicineMetaData(users);
  await addQueue(
    WEEKLY_REPORT_QUEUE,
    'generate-report',
    transformedData,
    '0 12 * * 0'
  );
};

function transformUsersWithMedicineMetaData(users) {
  return users.map((user) => ({
    userId: user._id,
    name: user.name,
    email: user.email,
    medicineMetaData: user.medicineMetaData.map((medication) => ({
      ['Medicine Name']: medication.name,
      ['Time']: medication.time,
      ['Description']: medication.description,
      ['Date']: formatDate(medication.date),
      ['Schedule Type']: medication.scheduleType,
      ['Status']: medication.status,
    })),
  }));
}

module.exports = weeklyReportQueue();

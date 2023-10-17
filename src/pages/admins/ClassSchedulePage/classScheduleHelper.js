// {
//   "id": 6,
//   "orderNumber": 1,
//   "startTime": "2022-11-30T07:00:00Z",
//   "endTime": "2022-11-30T07:45:00Z",
//   "days": {
//       "mon": {
//           "subject": {
//               "name": "Math"
//           },
//           "teacher": {}
//       },
//       "tue": null,
//       "wed": null,
//       "thu": null,
//       "fri": null
//   },
//   "key": 6
// }

export function prepareScheduleTable(scheduleData, callsSchedule = []) {
  let schedule = prepareSheduleTemplate(scheduleData, callsSchedule);

  console.log(schedule);

  return schedule;
}

function prepareSheduleTemplate(scheduleData, callsSchedule) {
  let res = [];
  for (let i = 0; i < callsSchedule.length; i++) {
    let cS = callsSchedule[i];
    res.push({
      id: cS.id,
      orderNumber: cS.orderNumber,
      startTime: cS.startTime,
      endTime: cS.endTime,
      days: {
        mon: prepareDaySubject(scheduleData, "mon", cS.orderNumber),
        tue: prepareDaySubject(scheduleData, "tue", cS.orderNumber),
        wed: prepareDaySubject(scheduleData, "wed", cS.orderNumber),
        thu: prepareDaySubject(scheduleData, "thu", cS.orderNumber),
        fri: prepareDaySubject(scheduleData, "fri", cS.orderNumber),
      },
    });
  }
  return res;
}

function prepareDaySubject(scheduleData, day, orderNumber) {
  let targetScheduleDay = scheduleData.find(
    (sD) => sD.dayOfWeek === day && sD.orderNumber === orderNumber
  );

  if (!targetScheduleDay) {
    return null;
  }

  return {
    subject: {
      ...targetScheduleDay.classSubject.subject,
    },
    teacher: {
      ...targetScheduleDay.classSubject.techer,
    },
  };
}

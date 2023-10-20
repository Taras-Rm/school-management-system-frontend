import api from "./api";

export const getSchoolCallsSchedule = async () => {
  const response = await api.get(`/admins/school/calls_schedule`);
  return response.data;
};

export const updateSchoolCallsSchedule = async ({ callsSchedule }) => {
  const response = await api.put(`/admins/school/calls_schedule`, {
    callsSchedule,
  });
  return response.data;
};

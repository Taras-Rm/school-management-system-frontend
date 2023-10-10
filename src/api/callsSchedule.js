import api from "./api";

export const getSchoolCallsSchedule = async () => {
  const response = await api.get(`/admins/school/calls_schedule`);
  return response.data;
};

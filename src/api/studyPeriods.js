import api from "./api";

export const createStudyPeriod = async ({ startDate, endDate }) => {
  const response = await api.post(`/admins/school/study_periods`, {
    startDate,
    endDate,
  });
  return response.data;
};

export const getSchoolStudyPeriods = async () => {
  const response = await api.get(`/admins/school/study_periods`);
  return response.data;
};

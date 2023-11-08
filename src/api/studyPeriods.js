import api from "./api";

export const createStudyPeriod = async ({
  startDate,
  endDate,
  incrementClassesLevels,
}) => {
  const response = await api.post(`/school/study_periods`, {
    startDate,
    endDate,
    incrementClassesLevels,
  });
  return response.data;
};

export const getSchoolStudyPeriods = async () => {
  const response = await api.get(`/school/study_periods`);
  return response.data;
};

export const getSchoolActiveStudyPeriod = async () => {
  const response = await api.get(`/school/study_periods/active`);
  return response.data;
};

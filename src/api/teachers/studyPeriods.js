import api from "../api";

export const getSchoolActiveStudyPeriod = async () => {
  const response = await api.get(`/teachers/school/study_periods/active`);
  return response.data;
};

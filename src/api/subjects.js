import api from "./api";

export const getSchoolSubjects = async () => {
  const response = await api.get(`/admins/school/subjects`);
  return response.data;
};

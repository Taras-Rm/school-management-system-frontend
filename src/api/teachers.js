import api from "./api";

export const getSchoolTeachers = async () => {
  const response = await api.get(`/admins/school/teachers`);
  return response.data;
};

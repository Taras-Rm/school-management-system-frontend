import api from "./api";

export const getSchoolSubjects = async () => {
  const response = await api.get(`/admins/school/subjects`);
  return response.data;
};

export const createSchoolSubject = async ({ name }) => {
  const response = await api.post(`/admins/school/subjects`, {
    name,
  });
  return response.data;
};

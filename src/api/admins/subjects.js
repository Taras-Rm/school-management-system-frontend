import api from "../api";

export const getSchoolSubjects = async () => {
  const response = await api.get(`/admins/school/subjects`);
  return response.data;
};

export const getSchoolSubject = async ({ id }) => {
  const response = await api.get(`/admins/school/subjects/${id}`);
  return response.data;
};

export const createSchoolSubject = async ({ name }) => {
  const response = await api.post(`/admins/school/subjects`, {
    name,
  });
  return response.data;
};

export const updateSchoolSubject = async ({ id, name, schoolId }) => {
  const response = await api.put(`/admins/school/subjects/${id}`, {
    id,
    name,
    schoolId,
  });
  return response.data;
};

export const deleteSchoolSubject = async ({ id }) => {
  const response = await api.delete(`/admins/school/subjects/${id}`);
  return response.data;
};

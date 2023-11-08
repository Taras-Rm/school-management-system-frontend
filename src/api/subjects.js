import api from "./api";

export const getSchoolSubjects = async () => {
  const response = await api.get(`/school/subjects`);
  return response.data;
};

export const getSchoolSubject = async ({ id }) => {
  const response = await api.get(`/school/subjects/${id}`);
  return response.data;
};

export const createSchoolSubject = async ({ name }) => {
  const response = await api.post(`/school/subjects`, {
    name,
  });
  return response.data;
};

export const updateSchoolSubject = async ({ id, name, schoolId }) => {
  const response = await api.put(`/school/subjects/${id}`, {
    id,
    name,
    schoolId,
  });
  return response.data;
};

export const deleteSchoolSubject = async ({ id }) => {
  const response = await api.delete(`/school/subjects/${id}`);
  return response.data;
};

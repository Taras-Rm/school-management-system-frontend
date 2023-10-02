import api from "./api";

export const getSchoolStudents = async () => {
  const response = await api.get(`/admins/school/students`);
  return response.data;
};

export const createSchoolStudent = async ({ name, surname, email }) => {
  const response = await api.post(`/admins/school/students`, {
    name,
    surname,
    email,
  });
  return response.data;
};

export const deleteSchoolStudent = async ({ studentId }) => {
  const response = await api.delete(`/admins/school/students/${studentId}`);
  return response.data;
};

export const getSchoolStudent = async ({ id }) => {
  const response = await api.get(`/admins/school/students/${id}`);
  return response.data;
};
import api from "./api";

export const getSchoolTeachers = async () => {
  const response = await api.get(`/admins/school/teachers`);
  return response.data;
};

export const createSchoolTeacher = async ({ name, surname, email }) => {
  const response = await api.post(`/admins/school/teachers`, {
    name,
    surname,
    email,
  });
  return response.data;
};

export const deleteSchoolTeacher = async ({ teacherId }) => {
  const response = await api.delete(`/admins/school/teachers/${teacherId}`);
  return response.data;
};

export const getSchoolTeacher = async ({ id }) => {
  const response = await api.get(`/admins/school/teachers/${id}`);
  return response.data;
};
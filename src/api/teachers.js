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

export const assignClassForTeacher = async ({ id, classId }) => {
  const response = await api.put(`/admins/school/teachers/${id}/class/assign`, {
    classId,
  });
  return response.data;
};

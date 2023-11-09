import api from "./api";

export const getSchoolTeachers = async () => {
  const response = await api.get(`/school/teachers`);
  return response.data;
};

export const createSchoolTeacher = async ({
  name,
  surname,
  email,
  dob,
  address,
  phone,
  gender,
  degree,
}) => {
  const response = await api.post(`/school/teachers`, {
    name,
    surname,
    email,
    dob,
    address,
    phone,
    gender,
    degree,
  });
  return response.data;
};

export const updateSchoolTeacher = async ({
  id,
  name,
  surname,
  email,
  dob,
  address,
  phone,
  gender,
  degree,
}) => {
  const response = await api.put(`/school/teachers/${id}`, {
    name,
    surname,
    email,
    dob,
    address,
    phone,
    gender,
    degree,
  });
  return response.data;
};

export const deleteSchoolTeacher = async ({ teacherId }) => {
  const response = await api.delete(`/school/teachers/${teacherId}`);
  return response.data;
};

export const getSchoolTeacher = async ({ id }) => {
  const response = await api.get(`/school/teachers/${id}`);
  return response.data;
};

export const getTeacherSchoolClasses = async ({ id }) => {
  const response = await api.get(`/school/teachers/${id}/classes`);
  return response.data;
};

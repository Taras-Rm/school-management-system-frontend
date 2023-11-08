import api from "./api";

export const getSchoolStudents = async () => {
  const response = await api.get(`/school/students`);
  return response.data;
};

export const createSchoolStudent = async ({
  name,
  surname,
  email,
  dob,
  address,
  phone,
  gender,
}) => {
  const response = await api.post(`/school/students`, {
    name,
    surname,
    email,
    dob,
    address,
    phone,
    gender,
  });
  return response.data;
};

export const updateSchoolStudent = async ({
  id,
  name,
  surname,
  email,
  dob,
  address,
  phone,
  gender,
}) => {
  const response = await api.put(`/school/students/${id}`, {
    name,
    surname,
    email,
    dob,
    address,
    phone,
    gender,
  });
  return response.data;
};

export const deleteSchoolStudent = async ({ studentId }) => {
  const response = await api.delete(`/school/students/${studentId}`);
  return response.data;
};

export const getSchoolStudent = async ({ id }) => {
  const response = await api.get(`/school/students/${id}`);
  return response.data;
};

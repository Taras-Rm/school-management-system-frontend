import api from "./api";

export const getSchoolClasses = async () => {
  const response = await api.get(`/admins/school/classes`);
  return response.data;
};

export const getSchoolClass = async ({ id }) => {
  const response = await api.get(`/admins/school/classes/${id}`);
  return response.data;
};

export const createSchoolClass = async ({ name }) => {
  const response = await api.post(`/admins/school/classes`, {
    name,
  });
  return response.data;
};

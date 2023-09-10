import api from "./api";

export const getAdminSchool = async () => {
  const response = await api.get(`/admins/school`);
  return response.data;
};

export const createSchool = async ({ name }) => {
  const response = await api.post(`/admins/school`, { name });
  return response.data;
};

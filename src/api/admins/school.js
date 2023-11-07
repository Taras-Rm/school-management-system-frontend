import api from "../api";

export const getAdminSchool = async () => {
  const response = await api.get(`/admins/school`);
  return response.data;
};

export const createSchool = async ({ name }) => {
  const response = await api.post(`/admins/school`, { name });
  return response.data;
};

export const getSchoolBasicInfo = async () => {
  const response = await api.get(`/admins/school/basic_info`);
  return response.data;
};

export const updateSchool = async ({ name }) => {
  const response = await api.put(`/admins/school`, { name });
  return response.data;
};
import api from "./api";

export const getAdminSchool = async () => {
  const response = await api.get(`/admins/school`);
  return response.data;
};

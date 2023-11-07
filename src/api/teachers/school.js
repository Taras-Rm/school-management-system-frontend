import api from "../api";

export const getSchoolBasicInfo = async () => {
  const response = await api.get(`/teachers/school/basic_info`);
  return response.data;
};
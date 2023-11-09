import api from "./api";

export const getJournal = async ({ id }) => {
  const response = await api.get(`/school/journals/${id}`);
  return response.data;
};

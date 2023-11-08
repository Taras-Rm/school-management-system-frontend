import api from "./api";

export const me = async () => {
  const response = await api.get(`/me`)
  return response.data
}

export const login = async ({ email, password, role }) => {
  const response = await 
  api.post(`/login`, {
    email,
    password,
    role
  });
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("authToken");
};

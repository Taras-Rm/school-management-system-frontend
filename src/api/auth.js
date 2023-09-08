import api from "./api";

export const me = async () => {
  const response = await api.get(`/users/me`)
  return response.data
}

export const login = async ({ email, password, role }) => {
  let userPath = "";
  if (role === "admin") {
    userPath = "admins";
  } else if (role === "student") {
    userPath = "students";
  } else if (role === "teacher") {
    userPath = "teachers";
  }

  const response = await 
  api.post(`/${userPath}/login`, {
    email,
    password,
  });
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("authToken");
};

import api from "./api";

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

  localStorage.setItem("authToken", response.data.token);

  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("authToken");
};

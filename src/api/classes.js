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

export const updateSchoolClass = async ({ id, name, teacherId }) => {
  const response = await api.put(`/admins/school/classes/${id}`, {
    name,
    teacherId,
  });
  return response.data;
};

export const getSchoolClassStudents = async ({ id }) => {
  const response = await api.get(`/admins/school/classes/${id}/students`);
  return response.data;
};

export const getStudentsAvailableForSchoolClassAssign = async ({ id }) => {
  const response = await api.get(
    `/admins/school/classes/${id}/students/assign`
  );
  return response.data;
};

export const assignClassForStudentsAssign = async ({ id, studentsIds }) => {
  const response = await api.put(
    `/admins/school/classes/${id}/students/assign`,
    { studentsIds: studentsIds }
  );
  return response.data;
};

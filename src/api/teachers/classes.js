import api from "../api";

export const getAssignedSchoolClasses = async () => {
  const response = await api.get(`/teachers/school/classes/assigned`);
  return response.data;
};

export const getSchoolClassStudents = async ({ id }) => {
    const response = await api.get(`/teachers/school/classes/${id}/students`);
    return response.data;
  };
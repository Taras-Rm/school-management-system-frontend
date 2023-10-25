import api from "./api";

export const getSchoolClasses = async () => {
  const response = await api.get(`/admins/school/classes`);
  return response.data;
};

export const getSchoolClass = async ({ id }) => {
  const response = await api.get(`/admins/school/classes/${id}`);
  return response.data;
};

export const createSchoolClass = async ({ level, section, description }) => {
  const response = await api.post(`/admins/school/classes`, {
    level,
    section,
    description,
  });
  return response.data;
};

export const updateSchoolClass = async ({
  id,
  level,
  section,
  description,
  teacherId,
}) => {
  const response = await api.put(`/admins/school/classes/${id}`, {
    level,
    section,
    description,
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

export const assignClassForStudents = async ({ id, studentsIds }) => {
  const response = await api.put(
    `/admins/school/classes/${id}/students/assign`,
    { studentsIds: studentsIds }
  );
  return response.data;
};

export const unassignClassForStudents = async ({ id, studentsIds }) => {
  const response = await api.put(
    `/admins/school/classes/${id}/students/unassign`,
    { studentsIds: studentsIds }
  );
  return response.data;
};

export const deleteSchoolClass = async ({ classId }) => {
  const response = await api.delete(`/admins/school/classes/${classId}`);
  return response.data;
};

export const createClassSubject = async ({ subjectId, classId, teacherId }) => {
  const response = await api.post(
    `/admins/school/classes/${classId}/subjects`,
    {
      subjectId,
      teacherId,
    }
  );
  return response.data;
};

export const getClassSubjects = async ({ id }) => {
  const response = await api.get(`/admins/school/classes/${id}/subjects`);
  return response.data;
};

export const deleteClassSubject = async ({ classId, subjectId }) => {
  const response = await api.delete(
    `/admins/school/classes/${classId}/subjects/${subjectId}`
  );
  return response.data;
};

export const updateClassSubject = async ({
  id,
  classId,
  subjectId,
  teacherId,
}) => {
  const response = await api.put(
    `/admins/school/classes/${classId}/subjects/${id}`,
    {
      id,
      classId,
      subjectId,
      teacherId,
    }
  );
  return response.data;
};

export const getClassSubject = async ({ classId, classSubjectId }) => {
  const response = await api.get(
    `/admins/school/classes/${classId}/subjects/${classSubjectId}`
  );
  return response.data;
};

export const getClassSchedule = async ({ classId }) => {
  const response = await api.get(`/admins/school/classes/${classId}/schedule`);
  return response.data;
};

export const updateClassSchedule = async ({ schedule, classId }) => {
  const response = await api.put(`/admins/school/classes/${classId}/schedule`, {
    schedule,
  });
  return response.data;
};

export const getClassJournals = async ({ id }) => {
  const response = await api.get(`/admins/school/classes/${id}/journals`);
  return response.data;
};
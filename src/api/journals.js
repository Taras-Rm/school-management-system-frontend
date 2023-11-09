import api from "./api";

export const getJournal = async ({ id }) => {
  const response = await api.get(`/school/journals/${id}`);
  return response.data;
};

export const getJournalColumns = async ({ id }) => {
  const response = await api.get(`/school/journals/${id}/columns`);
  return response.data;
};

export const getJournalStudentsGrades = async ({ id }) => {
  const response = await api.get(`/school/journals/${id}/students_grades`);
  return response.data;
};

export const upsertJournalStudentGrade = async ({
  journalGradeId,
  journalId,
  journalColumnId,
  studentId,
  grade,
}) => {
  const response = await api.post(
    `/school/journals/${journalId}/students_grades`,
    {
      id: journalGradeId,
      journalId,
      journalColumnId,
      studentId,
      grade,
    }
  );
  return response.data;
};

export const deleteJournalStudentGrade = async ({
  journalId,
  journalGradeId,
}) => {
  const response = await api.delete(
    `/school/journals/${journalId}/students_grades/${journalGradeId}`
  );
  return response.data;
};

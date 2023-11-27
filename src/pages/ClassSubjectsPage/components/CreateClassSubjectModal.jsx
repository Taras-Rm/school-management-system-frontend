import { Form, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createClassSubject } from "../../../api/classes";
import { getSchoolSubjects } from "../../../api/subjects";
import { getSchoolTeachers } from "../../../api/teachers";
import { RETRY_COUNT } from "../../../api/api";

function CreateClassSubjectModal({
  t,
  isOpen,
  setIsCreateClassSubjectModalOpen,
  classId,
}) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const { data: subjects = [], isLoading: isLoadingSubjects } = useQuery(
    ["subjects"],
    getSchoolSubjects,
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const { data: teachers = [], isLoading: isLoadingTeachers } = useQuery(
    ["teachers"],
    getSchoolTeachers,
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const createClassSubjectMutation = useMutation(createClassSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      message.success("Class subject added");
      setIsCreateClassSubjectModalOpen(false);
    },
    onError: (err) => {
      message.error("Failed to create a class: " + err.response.data?.message);
    },
  });

  const handleCreateClassSubject = (values) => {
    createClassSubjectMutation.mutate({
      subjectId: values.subjectId,
      teacherId: values.teacherId,
      classId: classId,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateClassSubjectModalOpen(false)}
      title={t("forms.addClassSubject.title")}
      okText={t("buttons.add")}
      cancelText={t("buttons.cancel")}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        onFinish={handleCreateClassSubject}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name={"subjectId"}
          label={t("tables.subject")}
          rules={[{ required: true }]}
        >
          <Select
            placeholder={t("formFields.select")}
            loading={isLoadingSubjects}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
          />
        </Form.Item>
        <Form.Item name={"teacherId"} label={t("tables.teacher")}>
          <Select
            placeholder={t("formFields.select")}
            loading={isLoadingTeachers}
            options={teachers.map((s) => ({
              value: s.id,
              label: `${s.name} ${s.surname}`,
            }))}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateClassSubjectModal;

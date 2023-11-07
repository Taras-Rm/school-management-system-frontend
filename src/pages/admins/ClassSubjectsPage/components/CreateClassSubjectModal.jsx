import { Form, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createClassSubject } from "../../../../api/admins/classes";
import { getSchoolSubjects } from "../../../../api/admins/subjects";
import { getSchoolTeachers } from "../../../../api/admins/teachers";

function CreateClassSubjectModal({
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
    }
  );

  const { data: teachers = [], isLoading: isLoadingTeachers } = useQuery(
    ["teachers"],
    getSchoolTeachers,
    {
      onError: (error) => {
        message.error(error);
      },
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
      title="Create class"
      okText={"Create class"}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleCreateClassSubject} layout="vertical">
        <Form.Item
          name={"subjectId"}
          label="Subjects"
          rules={[{ required: true }]}
        >
          <Select
            loading={isLoadingSubjects}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
          />
        </Form.Item>
        <Form.Item
          name={"teacherId"}
          label="Teacher"
        >
          <Select
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

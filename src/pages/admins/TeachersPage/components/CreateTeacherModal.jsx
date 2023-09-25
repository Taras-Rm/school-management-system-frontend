import { Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchoolTeacher } from "../../../../api/teachers";

function CreateTeacherModal({ isOpen, setIsCreateTeacherModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createTeacherMutation = useMutation(createSchoolTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers"]);
      message.success("Teacher is created");
      setIsCreateTeacherModalOpen(false);
    },
    onError: (err) => {
      message.error("Failed to create a teacher: " + err.response.data?.message);
    },
  });

  const handleCreateTeacher = (values) => {
    createTeacherMutation.mutate({
      name: values.name,
      surname: values.surname,
      email: values.email,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateTeacherModalOpen(false)}
      title="Create teacher"
      okText={"Create teacher"}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleCreateTeacher} layout="vertical">
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={"surname"}
          label="Surname"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateTeacherModal;

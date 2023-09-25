import { Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchoolStudent } from "../../../../api/students";

function CreateStudentModal({ isOpen, setIsCreateStudentModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createStudentMutation = useMutation(createSchoolStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      message.success("Student is created");
      setIsCreateStudentModalOpen(false);
    },
    onError: (err) => {
      message.error(
        "Failed to create a student: " + err.response.data?.message
      );
    },
  });

  const handleCreateStudent = (values) => {
    createStudentMutation.mutate({
      name: values.name,
      surname: values.surname,
      email: values.email,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateStudentModalOpen(false)}
      title="Create student"
      okText={"Create student"}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleCreateStudent} layout="vertical">
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

export default CreateStudentModal;

import { Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchoolStudent } from "../../../../api/students";
import { createSchoolClass } from "../../../../api/classes";

function CreateClassModal({ isOpen, setIsCreateClassModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createClassMutation = useMutation(createSchoolClass, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      message.success("Class is created");
      setIsCreateClassModalOpen(false);
    },
    onError: (err) => {
      message.error("Failed to create a class: " + err.response.data?.message);
    },
  });

  const handleCreateClass = (values) => {
    createClassMutation.mutate({
      name: values.name,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateClassModalOpen(false)}
      title="Create class"
      okText={"Create class"}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleCreateClass} layout="vertical">
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateClassModal;

import { Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchool } from "../../../../api/school";

function CreateSchoolModal({ isOpen, setIsCreateSchoolModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createSchoolMutation = useMutation(createSchool, {
    onSuccess: () => {
      queryClient.invalidateQueries(["school"]);
      queryClient.invalidateQueries(["me"]);
      message.success("School is created");
    },
    onError: (err) => {
      message.error(err);
    },
  });

  const handleCreateSchool = (values) => {
    createSchoolMutation.mutate({ name: values.name });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateSchoolModalOpen(false)}
      title="Create school"
      okText={"Create school"}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleCreateSchool} layout="vertical">
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateSchoolModal;

import { Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchoolSubject } from "../../../../api/subjects";

function CreateSubjectModal({ isOpen, setIsCreateSubjectModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createSubjectMutation = useMutation(createSchoolSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["subjects"]);
      message.success("Subject is created");
      setIsCreateSubjectModalOpen(false);
    },
    onError: (err) => {
      message.error(
        "Failed to create a subject: " + err.response.data?.message
      );
    },
  });

  const handleCreateSubject = (values) => {
    createSubjectMutation.mutate({
      name: values.name,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateSubjectModalOpen(false)}
      title="Create subject"
      okText={"Create subject"}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleCreateSubject} layout="vertical">
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateSubjectModal;

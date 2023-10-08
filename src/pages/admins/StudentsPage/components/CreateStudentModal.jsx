import { DatePicker, Form, Input, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchoolStudent } from "../../../../api/students";
import { genderOptions } from "../../../../utils/staticData";

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
      dob: values.dob,
      address: values.address,
      phone: values.phone,
      gender: values.gender,
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
        <div style={{ display: "flex" }}>
          <Form.Item
            name={"name"}
            label="Name"
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"surname"}
            label="Surname"
            rules={[{ required: true }]}
            style={{ flex: 1, marginLeft: 10 }}
          >
            <Input />
          </Form.Item>
        </div>
        <div style={{ display: "flex" }}>
          <Form.Item
            name={"dob"}
            label={"Date of birth"}
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={"gender"}
            label={"Gender"}
            rules={[{ required: true }]}
            style={{ flex: 1, marginLeft: 10 }}
          >
            <Select options={genderOptions} />
          </Form.Item>
        </div>
        <Form.Item
          name={"phone"}
          label="Phone"
          rules={[{ required: true, max: 10, min: 10 }]}
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
        <Form.Item name={"address"} label="Adress">
          <Input placeholder="City, Street" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateStudentModal;

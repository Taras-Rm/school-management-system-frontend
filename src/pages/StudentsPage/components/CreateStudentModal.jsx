import { DatePicker, Form, Input, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchoolStudent } from "../../../api/students";
import { genderOptions } from "../../../utils/staticData";

function CreateStudentModal({ t, isOpen, setIsCreateStudentModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createStudentMutation = useMutation(createSchoolStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      message.success(t("forms.addStudent.msgAdded"));
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
      title={t("forms.addStudent.title")}
      okText={t("buttons.add")}
      cancelText={t("buttons.cancel")}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        onFinish={handleCreateStudent}
        layout="vertical"
        requiredMark={false}
      >
        <div style={{ display: "flex" }}>
          <Form.Item
            name={"name"}
            label={t("formFields.name")}
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"surname"}
            label={t("formFields.surname")}
            rules={[{ required: true }]}
            style={{ flex: 1, marginLeft: 10 }}
          >
            <Input />
          </Form.Item>
        </div>
        <div style={{ display: "flex" }}>
          <Form.Item
            name={"dob"}
            label={t("formFields.dob")}
            rules={[{ required: true }]}
          >
            <DatePicker placeholder={t("formFields.selectDate")} />
          </Form.Item>
          <Form.Item
            name={"gender"}
            label={t("formFields.gender")}
            rules={[{ required: true }]}
            style={{ flex: 1, marginLeft: 10 }}
          >
            <Select options={genderOptions} />
          </Form.Item>
        </div>
        <Form.Item
          name={"phone"}
          label={t("formFields.phone")}
          rules={[{ required: true, max: 10, min: 10 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label={t("formFields.email")}
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"address"} label={t("formFields.address")}>
          <Input placeholder={t("formFields.address")} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateStudentModal;

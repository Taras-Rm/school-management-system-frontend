import { DatePicker, Form, Input, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchoolTeacher } from "../../../api/teachers";
import { degreesLevelsOptions, genderOptions } from "../../../utils/staticData";

function CreateTeacherModal({ t, isOpen, setIsCreateTeacherModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createTeacherMutation = useMutation(createSchoolTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers"]);
      message.success("Teacher is created");
      setIsCreateTeacherModalOpen(false);
    },
    onError: (err) => {
      message.error(
        "Failed to create a teacher: " + err.response.data?.message
      );
    },
  });

  const handleCreateTeacher = (values) => {
    createTeacherMutation.mutate({
      name: values.name,
      surname: values.surname,
      email: values.email,
      dob: values.dob,
      address: values.address,
      phone: values.phone,
      gender: values.gender,
      degree: values.degree,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateTeacherModalOpen(false)}
      title={t("forms.addTeacher.title")}
      okText={t("buttons.add")}
      cancelText={t("buttons.cancel")}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleCreateTeacher} layout="vertical">
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
          <Input />
        </Form.Item>
        <Form.Item
          name={"degree"}
          label={t("formFields.degree")}
          rules={[{ required: true }]}
        >
          <Select options={degreesLevelsOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateTeacherModal;

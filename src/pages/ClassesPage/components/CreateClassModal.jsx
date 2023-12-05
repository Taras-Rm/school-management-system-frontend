import { Form, Modal, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { createSchoolClass } from "../../../api/classes";
import {
  classLevelOptions,
  classSectionOptions,
} from "../../../utils/staticData";
import TextArea from "antd/es/input/TextArea";

function CreateClassModal({ t, isOpen, setIsCreateClassModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const createClassMutation = useMutation(createSchoolClass, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      message.success(t("forms.addClass.msgCreated"));
      setIsCreateClassModalOpen(false);
    },
    onError: (err) => {
      message.error("Failed to create a class: " + err.response.data?.message);
    },
  });

  const handleCreateClass = (values) => {
    createClassMutation.mutate({
      level: values.level,
      section: values.section,
      description: values.description,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateClassModalOpen(false)}
      title={t("forms.addClass.title")}
      okText={t("buttons.add")}
      cancelText={t("buttons.cancel")}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        onFinish={handleCreateClass}
        layout="vertical"
        requiredMark={false}
      >
        <div style={{ display: "flex" }}>
          <Form.Item
            name={"level"}
            label={t("formFields.level")}
            rules={[{ required: true }]}
            style={{ flex: 1 }}
          >
            <Select options={classLevelOptions} />
          </Form.Item>
          <Form.Item
            name={"section"}
            label={t("formFields.section")}
            rules={[{ required: true }]}
            style={{ flex: 1, marginLeft: 10 }}
          >
            <Select options={classSectionOptions} />
          </Form.Item>
        </div>
        <Form.Item name={"description"} label={t("formFields.description")}>
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateClassModal;

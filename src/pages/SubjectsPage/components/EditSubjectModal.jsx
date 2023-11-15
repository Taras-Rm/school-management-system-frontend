import { Form, Input, Modal, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSchoolSubject, updateSchoolSubject } from "../../../api/subjects";

function EditSubjectModal({ t, subjectId, setEditSubjectId }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const { isLoading: isLoadingSubject } = useQuery(
    ["subjects", subjectId],
    () => getSchoolSubject({ id: subjectId }),
    {
      onError: (error) => {
        message.error(error);
      },
      onSuccess: (data) => {
        form.setFieldsValue(data);
      },
      enabled: !!subjectId,
    }
  );

  const updateSubjectMutation = useMutation(updateSchoolSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries("subjects", subjectId);
      message.success("Subject updated");
      setEditSubjectId(null);
      form.resetFields();
    },
    onError: (err) => {
      message.error(
        "Failed to update a subject: " + err.response.data?.message
      );
    },
  });

  const handleUpdateSubject = (values) => {
    updateSubjectMutation.mutate({
      id: subjectId,
      name: values.name,
      schoolId: values.schoolId,
    });
  };

  if (isLoadingSubject) return <Spin spinning />;

  return (
    <Modal
      open={subjectId}
      onCancel={() => setEditSubjectId(false)}
      title={t("forms.editSubject.title")}
      okText={t("buttons.update")}
      cancelText={t("buttons.cancel")}
      onOk={() => form.submit()}
      closable
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={handleUpdateSubject}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name={"name"}
          label={t("formFields.name2")}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditSubjectModal;

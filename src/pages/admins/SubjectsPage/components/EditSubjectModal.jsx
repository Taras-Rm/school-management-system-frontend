import { Form, Input, Modal, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getSchoolSubject,
  updateSchoolSubject,
} from "../../../../api/admins/subjects";

function EditSubjectModal({ subjectId, setEditSubjectId }) {
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
      title="Update subject"
      okText={"Update subject"}
      onOk={() => form.submit()}
      closable
      destroyOnClose
    >
      <Form form={form} onFinish={handleUpdateSubject} layout="vertical">
        <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditSubjectModal;

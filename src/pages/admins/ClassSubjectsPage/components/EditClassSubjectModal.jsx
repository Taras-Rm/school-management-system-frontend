import { Form, Modal, Select, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getClassSubject, updateClassSubject } from "../../../../api/admins/classes";
import { getSchoolSubjects } from "../../../../api/admins/subjects";
import { getSchoolTeachers } from "../../../../api/admins/teachers";

function EditClassSubjectModal({
  classSubjectId,
  classId,
  setUpdateClassSubjectId,
}) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const { isLoading: isLoadingClassSubject } = useQuery(
    ["classes", classId, "subjects", classSubjectId],
    () => getClassSubject({ classId, classSubjectId }),
    {
      onError: (error) => {
        message.error(error);
      },
      onSuccess: (data) => {
        form.setFieldsValue(data);
      },
      enabled: !!classId && !!classSubjectId,
    }
  );

  const { data: subjects = [], isLoading: isLoadingSubjects } = useQuery(
    ["subjects"],
    getSchoolSubjects,
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const { data: teachers = [], isLoading: isLoadingTeachers } = useQuery(
    ["teachers"],
    getSchoolTeachers,
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const updateClassSubjectMutation = useMutation(updateClassSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries("classes", classId, "subjects");
      message.success("Class subject updated");
      setUpdateClassSubjectId(null);
      form.resetFields();
    },
    onError: (err) => {
      message.error(
        "Failed to update a class subject: " + err.response.data?.message
      );
    },
  });

  const handleUpdateClassSubject = (values) => {
    updateClassSubjectMutation.mutate({
      id: classSubjectId,
      subjectId: values.subjectId,
      teacherId: values.teacherId,
      classId: parseInt(classId, 10),
    });
  };

  if (isLoadingClassSubject) return <Spin spinning />;

  return (
    <Modal
      open={classSubjectId}
      onCancel={() => setUpdateClassSubjectId(false)}
      title="Update class subject"
      okText={"Update class subject"}
      onOk={() => form.submit()}
      closable
      destroyOnClose
    >
      <Form form={form} onFinish={handleUpdateClassSubject} layout="vertical">
        <Form.Item
          name={"subjectId"}
          label="Subject"
          rules={[{ required: true }]}
        >
          <Select
            loading={isLoadingSubjects}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            disabled
          />
        </Form.Item>
        <Form.Item name={"teacherId"} label="Teacher">
          <Select
            loading={isLoadingTeachers}
            options={teachers.map((s) => ({
              value: s.id,
              label: `${s.name} ${s.surname}`,
            }))}
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditClassSubjectModal;

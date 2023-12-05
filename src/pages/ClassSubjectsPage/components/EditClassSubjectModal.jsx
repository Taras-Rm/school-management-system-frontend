import { Form, Modal, Select, Spin, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getClassSubject, updateClassSubject } from "../../../api/classes";
import { getSchoolSubjects } from "../../../api/subjects";
import { getSchoolTeachers } from "../../../api/teachers";
import { RETRY_COUNT } from "../../../api/api";

function EditClassSubjectModal({
  t,
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
      retry: RETRY_COUNT,
    }
  );

  const { data: subjects = [], isLoading: isLoadingSubjects } = useQuery(
    ["subjects"],
    getSchoolSubjects,
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const { data: teachers = [], isLoading: isLoadingTeachers } = useQuery(
    ["teachers"],
    getSchoolTeachers,
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const updateClassSubjectMutation = useMutation(updateClassSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries("classes", classId, "subjects");
      message.success(t("forms.editClassSubject.msgUpdated"));
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
      title={t("forms.editClassSubject.title")}
      okText={t("buttons.update")}
      cancelText={t("buttons.cancel")}
      onOk={() => form.submit()}
      closable
      destroyOnClose
    >
      <Form
        form={form}
        onFinish={handleUpdateClassSubject}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name={"subjectId"}
          label={t("tables.subject")}
          rules={[{ required: true }]}
        >
          <Select
            loading={isLoadingSubjects}
            options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            disabled
          />
        </Form.Item>
        <Form.Item name={"teacherId"} label={t("tables.teacher")}>
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

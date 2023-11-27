import { Form, Modal, Spin, Table, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createClassJournals, getClassSubjects } from "../../../api/classes";
import { getSchoolActiveStudyPeriod } from "../../../api/studyPeriods";
import { formatDate } from "../../../utils/date";
import { RETRY_COUNT } from "../../../api/api";

function CreateClassJournalsModal({
  t,
  isOpen,
  setIsCreateClassJournalsModalOpen,
  classId,
  disabledClassSubjectsIds = [],
}) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const { data: classSubjects = [], isLoading: isLoadingClassSubjects } =
    useQuery(
      ["classes", classId, "subjects"],
      () => getClassSubjects({ id: classId }),
      {
        onError: (error) => {
          message.error(error);
        },
        retry: RETRY_COUNT,
      }
    );

  const { data: studyPeriod = [], isLoading: isLoadingStudyPeriod } = useQuery(
    ["studyPeriods", "active"],
    () => getSchoolActiveStudyPeriod(),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const createClassJournalsMutation = useMutation(createClassJournals, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes", classId, "journals"]);
      message.success("Journals are created");
      setIsCreateClassJournalsModalOpen(false);
      form.resetFields();
    },
    onError: (err) => {
      message.error("Failed to create journals: " + err.response.data?.message);
    },
  });

  const handleCreateClassJournals = (values) => {
    if (!values.classSubjectsIds?.length) {
      message.warning("You should select at least one subject!");
      return;
    }

    createClassJournalsMutation.mutate({
      classId: classId,
      classSubjectsIds: values.classSubjectsIds,
    });
  };

  const tableColumns = [
    {
      title: t("tables.name"),
      dataIndex: "name",
      key: "name",
      render: (value, item) => {
        return `${item.subject.name}`;
      },
    },
    {
      title: t("tables.teacher"),
      dataIndex: "name",
      key: "name",
      render: (value, item) => {
        return item.teacher && `${item.teacher.name} ${item.teacher.surname}`;
      },
    },
  ];

  const tableData = classSubjects?.map((t) => {
    return {
      ...t,
      key: t.id,
    };
  });

  const onModalCancel = () => {
    setIsCreateClassJournalsModalOpen(false);
    form.resetFields();
  };

  if (isLoadingStudyPeriod || isLoadingClassSubjects) return <Spin spinning />;

  return (
    <Modal
      open={isOpen}
      onCancel={() => onModalCancel()}
      title={t("forms.createClassJournals.title")}
      okText={t("buttons.create")}
      cancelText={t("buttons.cancel")}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <div>
        <Typography.Text style={{ display: "inline-block", marginBottom: 5 }}>
          {`${t("forms.createClassJournals.studyPeriod")}: ${formatDate(
            new Date(studyPeriod.startDate)
          )} - ${formatDate(new Date(studyPeriod.endDate))}`}
        </Typography.Text>
        <Typography.Text style={{ display: "inline-block", marginBottom: 15 }}>
          {t("forms.createClassJournals.description1")}
        </Typography.Text>
        <Typography.Text style={{ display: "inline-block", marginBottom: 15 }}>
          {t("forms.createClassJournals.description2")}
        </Typography.Text>
      </div>

      <Form form={form} onFinish={handleCreateClassJournals} layout="vertical">
        <Form.Item name={"classSubjectsIds"}>
          <Table
            loading={isLoadingClassSubjects}
            dataSource={tableData}
            columns={tableColumns}
            scroll={{ y: 400 }}
            pagination={false}
            rowSelection={{
              type: "checkbox",
              onChange: (_, selectedRows) => {
                form.setFieldsValue({
                  classSubjectsIds: selectedRows.map((row) => row.id),
                });
              },
              getCheckboxProps: (row) => ({
                disabled: disabledClassSubjectsIds.find((id) => id === row.id),
              }),
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateClassJournalsModal;

import { Form, Modal, Spin, Table, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createClassJournals, getClassSubjects } from "../../../api/classes";
import { getSchoolActiveStudyPeriod } from "../../../api/studyPeriods";
import { formatDate } from "../../../utils/date";

function CreateClassJournalsModal({
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
      }
    );

  const { data: studyPeriod = [], isLoading: isLoadingStudyPeriod } = useQuery(
    ["studyPeriods", "active"],
    () => getSchoolActiveStudyPeriod(),
    {
      onError: (error) => {
        message.error(error);
      },
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
      title: "Subject",
      dataIndex: "name",
      key: "name",
      render: (value, item) => {
        return `${item.subject.name}`;
      },
    },
    {
      title: "Teacher",
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
      title="Create journals"
      okText={"Create journals"}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <div>
        <Typography.Text style={{ display: "inline-block", marginBottom: 5 }}>
          Study period:
          {`${formatDate(new Date(studyPeriod.startDate))} - ${formatDate(
            new Date(studyPeriod.endDate)
          )}`}
        </Typography.Text>
        <Typography.Text style={{ display: "inline-block", marginBottom: 15 }}>
          It is neccessary set up correct schedule for subjects you want to create journals
        </Typography.Text>
        <Typography.Text style={{ display: "inline-block", marginBottom: 15 }}>
          Please, select subjects for which you want to create journals
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

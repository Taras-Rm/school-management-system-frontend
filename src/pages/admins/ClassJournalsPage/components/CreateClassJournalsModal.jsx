import { Form, Modal, Table, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getClassSubjects } from "../../../../api/classes";

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

  const createClassJournalsMutation = useMutation(() => {}, {
    onSuccess: () => {
      //queryClient.invalidateQueries(["classes"]);
      message.success("Journals are created");
      setIsCreateClassJournalsModalOpen(false);
    },
    onError: (err) => {
      message.error("Failed to create journals: " + err.response.data?.message);
    },
  });

  const handleCreateClassJournals = (values) => {
    // createClassJournalsMutation.mutate({
    //   level: values.level,
    //   section: values.section,
    //   description: values.description,
    // });
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

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsCreateClassJournalsModalOpen(false)}
      title="Create journals"
      okText={"Create journals"}
      onOk={() => form.submit()}
    >
      <Typography.Text style={{ display: "inline-block", marginBottom: 15 }}>
        Please, select subjects for which you want to create journals
      </Typography.Text>
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
                  studentsIds: selectedRows.map((row) => row.id),
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

import { Form, Table, message } from "antd";
import { useForm } from "antd/es/form/Form";
import Modal from "antd/es/modal/Modal";
import React from "react";
import {
  assignClassForStudents,
  getStudentsAvailableForSchoolClassAssign,
} from "../../../api/classes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { RETRY_COUNT } from "../../../api/api";

function AssignClassForStudentsModal({
  t,
  isOpen,
  setIsAssignClassForStudentsModalOpen,
  classId,
}) {
  const [form] = useForm();
  const queryClient = useQueryClient();

  const { data: students, isLoading: isLoadingStudents } = useQuery(
    ["students", "class", classId, "assign"],
    () => getStudentsAvailableForSchoolClassAssign({ id: classId }),
    {
      onError: (err) => {
        message.error("Failed to get students: " + err.response.data?.message);
      },
      retry: RETRY_COUNT
    }
  );

  const assignStudentsToClassMutation = useMutation(assignClassForStudents, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students", "class", classId]);
      queryClient.invalidateQueries(["students", "class", classId, "assign"]);
      message.success("Students are assigned!");
      setIsAssignClassForStudentsModalOpen(false);
    },
    onError: (err) => {
      message.error("Failed to create a class: " + err.response.data?.message);
    },
  });

  const handleAssignStudentsToClass = (values) => {
    if (!values.studentsIds?.length) {
      message.warning("You should select at least one student!");
      return;
    }
    assignStudentsToClassMutation.mutate({
      id: classId,
      studentsIds: values.studentsIds,
    });
  };

  const tableColumns = [
    {
      title: t("tables.name"),
      dataIndex: "name",
      key: "name",
      render: (value, item) => {
        return `${value} ${item.surname}`;
      },
    },
    {
      title: t("tables.email"),
      dataIndex: "email",
      key: "email",
      render: (value, item) => {
        return value;
      },
    },
  ];

  const tableData = students?.map((t) => {
    return {
      ...t,
      key: t.id,
    };
  });

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsAssignClassForStudentsModalOpen(false)}
      title={t("forms.assignStudentsToClass.title")}
      okText={t("buttons.assign")}
      cancelText={t("buttons.cancel")}
      onOk={() => form.submit()}
    >
      <Form
        onFinish={handleAssignStudentsToClass}
        form={form}
        layout="vertical"
      >
        <Form.Item name={"studentsIds"}>
          <Table
            loading={isLoadingStudents}
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
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AssignClassForStudentsModal;

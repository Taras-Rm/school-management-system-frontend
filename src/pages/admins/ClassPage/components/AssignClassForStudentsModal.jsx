import { Form, Table, message } from "antd";
import { useForm } from "antd/es/form/Form";
import Modal from "antd/es/modal/Modal";
import React from "react";
import {
  assignClassForStudentsAssign,
  getStudentsAvailableForSchoolClassAssign,
} from "../../../../api/classes";
import { useMutation, useQuery, useQueryClient } from "react-query";

function AssignClassForStudentsModal({
  isOpen,
  setIsAssignClassForStudentsModalOpen,
  classId,
}) {
  const [form] = useForm();
  const queryClient = useQueryClient();

  const {
    data: students,
    error: studentsError,
    isLoading: isLoadingStudents,
  } = useQuery(
    ["students", "class", classId, "assign"],
    () => getStudentsAvailableForSchoolClassAssign({ id: classId }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const assignStudentsToClassMutation = useMutation(
    assignClassForStudentsAssign,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students", "class", classId]);
        queryClient.invalidateQueries(["students", "class", classId, "assign"]);
        message.success("Students are assigned!");
        setIsAssignClassForStudentsModalOpen(false);
      },
      onError: (err) => {
        message.error(
          "Failed to create a class: " + err.response.data?.message
        );
      },
    }
  );

  const handleAssignStudentsToClass = (values) => {
    if (!values.studentsIds?.length) {
      message.warning("You should select at least one student!");
      return
    }
    assignStudentsToClassMutation.mutate({
      id: classId,
      studentsIds: values.studentsIds,
    });
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value, item) => {
        return `${value} ${item.surname}`;
      },
    },
    {
      title: "Email",
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
      title="Assign students"
      okText={"Assign students"}
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

import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Spin,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getSchoolClass,
  getSchoolClassStudents,
  unassignClassForStudents,
} from "../../api/classes";
import { generatePath, useNavigate, useParams } from "react-router";
import AssignClassForStudentsModal from "./components/AssignClassForStudentsModal";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";

function ClassPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [
    isAssignClassForStudentsModalOpen,
    setIsAssignClassForStudentsModalOpen,
  ] = useState(false);

  const { data: classData, isLoading } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const { data: students, isLoading: isLoadingStudents } = useQuery(
    ["students", "class", id],
    () => getSchoolClassStudents({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const unassignStudentForClassMutation = useMutation(
    unassignClassForStudents,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students", "class", id]);
      },
      onError: (err) => {
        message.error(
          "Failed to unassign student: " + err.response.data?.message
        );
      },
    }
  );

  const handleUnassignStudentForClass = (studentId) => {
    unassignStudentForClassMutation.mutate({
      id,
      studentsIds: [studentId],
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, item) => {
        return (
          <div>
            <Tooltip title="Unassign student from class">
              <CloseCircleTwoTone
                onClick={() => handleUnassignStudentForClass(item.id)}
                twoToneColor="#eb2f96"
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const tableData = students?.map((t) => {
    return {
      ...t,
      key: t.id,
    };
  });

  if (isLoading || isLoadingStudents) return <Spin spinning />;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(215 215 215)",
        padding: "10px 20px",
      }}
    >
      <Breadcrumb
        items={[
          {
            title: <Link to={routes.classesPage}>Classes</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.classPage, { id })}>
                {`${classData.level}-${classData.section}`}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${classData.level}-${classData.section}`} class
      </Typography.Title>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => setIsAssignClassForStudentsModalOpen(true)}
          >
            Assign students
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "green", marginLeft: 10 }}
            onClick={() =>
              navigate(generatePath(routes.classSubjectsPage, { id: id }))
            }
          >
            Subjects
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "green", marginLeft: 10 }}
            onClick={() =>
              navigate(generatePath(routes.classSchedulePage, { id: id }))
            }
          >
            Schedule
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "green", marginLeft: 10 }}
            onClick={() =>
              navigate(generatePath(routes.classJournalsPage, { id: id }))
            }
          >
            Journals
          </Button>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
            <Typography.Text style={{ marginRight: 5 }}>
              Class teacher:
            </Typography.Text>
            {classData.teacher ? (
              <Typography.Text
                strong
              >{`${classData.teacher.name} ${classData.teacher.surname}`}</Typography.Text>
            ) : (
              <Typography.Text>not defined</Typography.Text>
            )}
          </div>
        </div>
      </div>

      <Table
        dataSource={tableData}
        columns={tableColumns}
        scroll={{ y: 400 }}
        pagination={false}
      />

      <AssignClassForStudentsModal
        isOpen={isAssignClassForStudentsModalOpen}
        setIsAssignClassForStudentsModalOpen={
          setIsAssignClassForStudentsModalOpen
        }
        classId={id}
      />
    </div>
  );
}

export default ClassPage;

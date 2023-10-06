import { Card, Popconfirm, Typography, message } from "antd";
import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, generatePath } from "react-router-dom";
import { routes } from "../../../routes";
import {
  deleteSchoolClass,
  getSchoolClassStudents,
} from "../../../../api/classes";
import { useMutation, useQuery, useQueryClient } from "react-query";

function ClassCard({ classInfo }) {
  const queryClient = useQueryClient();

  const { data: students, isLoading: isLoadingStudents } = useQuery(
    ["students", "class", classInfo.id],
    () => getSchoolClassStudents({ id: classInfo.id }),
    {
      onError: (error) => {
        message.error(error);
      },
      enabled: !!classInfo.id,
    }
  );

  const deleteSchoolClassMutation = useMutation(deleteSchoolClass, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      message.success("Class is deleted!");
    },
    onError: (err) => {
      message.error("Failed to delete class: " + err.response.data?.message);
    },
  });

  const handleDeleteSchoolClass = (classId) => {
    deleteSchoolClassMutation.mutate({
      classId,
    });
  };

  return (
    <Card
      title={
        <Typography.Link
          href={generatePath(routes.adminClassPage, { id: classInfo.id })}
          style={{ fontSize: 18 }}
        >
          {`${classInfo.level}-${classInfo.section}`}
        </Typography.Link>
      }
      actions={[
        <Link
          style={{ width: "fit-content" }}
          to={generatePath(routes.adminEditClassPage, { id: classInfo.id })}
        >
          <EditOutlined />
        </Link>,
        <Popconfirm
          title="Delete class"
          description="Are you sure you want to delete a class ?"
          onConfirm={() => handleDeleteSchoolClass(classInfo.id)}
        >
          <DeleteOutlined />
        </Popconfirm>,
      ]}
      bordered={false}
      loading={isLoadingStudents}
    >
      <div>
        <Typography.Text>Class teacher: </Typography.Text>
        {classInfo.teacher ? (
          <Typography.Text
            strong
          >{`${classInfo.teacher.name} ${classInfo.teacher.surname}`}</Typography.Text>
        ) : (
          <Typography.Text>not defined</Typography.Text>
        )}
      </div>
      <div>
        <Typography.Text>Number of students: </Typography.Text>
        <Typography.Text strong>{students?.length}</Typography.Text>
      </div>
    </Card>
  );
}

export default ClassCard;

import { Card, Popconfirm, Typography, message } from "antd";
import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, generatePath } from "react-router-dom";
import { routes } from "../../routes";
import {
  deleteSchoolClass,
  getSchoolClassStudents,
} from "../../../api/classes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { RETRY_COUNT } from "../../../api/api";

function ClassCard({ t, classInfo, setEditClassId, showActions }) {
  const queryClient = useQueryClient();

  const { data: students, isLoading: isLoadingStudents } = useQuery(
    ["students", "class", classInfo.id],
    () => getSchoolClassStudents({ id: classInfo.id }),
    {
      onError: (error) => {
        message.error(error);
      },
      enabled: !!classInfo.id,
      retry: RETRY_COUNT,
    }
  );

  const deleteSchoolClassMutation = useMutation(deleteSchoolClass, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      message.success(t("pages.classes.card.msgDeleted"));
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
          href={generatePath(routes.classPage, { id: classInfo.id })}
          style={{ fontSize: 18 }}
        >
          {`${classInfo.level}-${classInfo.section}`}
        </Typography.Link>
      }
      actions={
        showActions && [
          <Link
            style={{ width: "fit-content" }}
            onClick={() => setEditClassId(classInfo.id)}
          >
            <EditOutlined />
          </Link>,
          <Popconfirm
            description={t("pages.classes.card.deleteClassConfirm")}
            onConfirm={() => handleDeleteSchoolClass(classInfo.id)}
            okText={t("buttons.ok")}
            cancelText={t("buttons.cancel")}
          >
            <DeleteOutlined />
          </Popconfirm>,
        ]
      }
      bordered={false}
      loading={isLoadingStudents}
    >
      <div>
        <Typography.Text>
          {t("pages.classes.card.classTeacher")}:{" "}
        </Typography.Text>
        {classInfo.teacher ? (
          <Typography.Text
            strong
          >{`${classInfo.teacher.name} ${classInfo.teacher.surname}`}</Typography.Text>
        ) : (
          <Typography.Text>{t("common.notDefined")}</Typography.Text>
        )}
      </div>
      <div>
        <Typography.Text>
          {t("pages.classes.card.numberOfStudents")}:{" "}
        </Typography.Text>
        <Typography.Text strong>{students?.length}</Typography.Text>
      </div>
    </Card>
  );
}

export default ClassCard;

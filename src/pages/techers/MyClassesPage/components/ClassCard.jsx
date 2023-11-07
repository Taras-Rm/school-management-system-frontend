import { Card, Typography, message } from "antd";
import React from "react";
import { generatePath } from "react-router-dom";
import { routes } from "../../../routes";
// import {
//   getSchoolClassStudents,
// } from "../../../../api/admins/classes";
import { useQuery, useQueryClient } from "react-query";
import { getSchoolClassStudents } from "../../../../api/teachers/classes";

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

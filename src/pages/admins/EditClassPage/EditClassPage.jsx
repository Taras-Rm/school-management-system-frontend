import React from "react";
import { getSchoolClass, updateSchoolClass } from "../../../api/classes";
import { generatePath, useParams } from "react-router";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSchoolTeachers } from "../../../api/teachers";
import { Link } from "react-router-dom";
import { routes } from "../../routes";

function EditClassPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: classData,
    error,
    isLoading,
  } = useQuery(["classes", id], () => getSchoolClass({ id }), {
    onError: (error) => {
      message.error(error);
    },
  });

  const {
    data: teachers,
    teachersError,
    teachersIsLoading,
  } = useQuery(["teachers"], getSchoolTeachers, {
    onError: (error) => {
      message.error(error);
    },
  });

  const updateClassMutation = useMutation(updateSchoolClass, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes", id]);
      message.success("Class is updated");
    },
    onError: (err) => {
      message.error("Failed to update a class: " + err.response.data?.message);
    },
  });

  const handleUpdateClass = (values) => {
    updateClassMutation.mutate({
      id: id,
      name: values.name,
      teacherId: values.teacherId,
    });
  };

  if (isLoading) return <Spin spinning />;

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
            title: <Link to={routes.adminClassesPage}>Classes</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.adminClassPage, { id })}>
                {classData.name}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.adminEditClassPage, { id })}>
                Edit {classData.name} class
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Edit {classData.name} class
      </Typography.Title>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Form
          initialValues={classData}
          style={{
            width: "100%",
            padding: "0 60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onFinish={handleUpdateClass}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Text style={{ fontSize: 16 }}>Name</Typography.Text>
            <Form.Item name={"name"} rules={[{ required: true }]}>
              <Input style={{ width: 200 }} />
            </Form.Item>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography.Text style={{ fontSize: 16 }}>
              Class teacher
            </Typography.Text>
            <Form.Item name={"teacherId"}>
              <Select
                style={{ width: 200 }}
                loading={teachersIsLoading}
                options={teachers?.map((teacher) => ({
                  value: teacher.id,
                  label: `${teacher.name} ${teacher.surname}`,
                }))}
                placeholder={"Select class teacher"}
                allowClear
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              htmlType="submit"
            >
              Save changes
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditClassPage;

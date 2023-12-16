import { Button, Form, Input, Radio, Typography, message } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { routes } from "../routes";
import { register } from "../../api/auth";

function RegisterPage() {
  const [form] = Form.useForm();

  const registerMutation = useMutation(register, {
    onSuccess: (data) => {
      message.success("Registered");
      window.location.href = routes.loginPage;
    },
    onError: () => {
      message.error("Failed to register");
    },
  });

  const handleRegister = (values) => {
    registerMutation.mutate({
      admin: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      },
      school: {
        name: values.schoolName,
      },
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography.Title level={2}>Registration</Typography.Title>
      <div style={{ width: 400 }}>
        <Form
          layout="vertical"
          onFinish={handleRegister}
          initialValues={{
            role: "admin",
          }}
          form={form}
          requiredMark={false}
        >
          <Typography.Text
            style={{ display: "inline-block", fontSize: 18, marginBottom: 10 }}
          >
            School
          </Typography.Text>
          <Form.Item
            name={"schoolName"}
            label="Name"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
          <Typography.Text
            style={{ display: "inline-block", fontSize: 18, marginBottom: 10 }}
          >
            Administrator
          </Typography.Text>
          <div style={{ display: "flex", width: "100%" }}>
            <Form.Item
              name={"name"}
              label="Name"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"surname"}
              label="Surname"
              rules={[{ required: true }]}
              style={{ width: "100%", marginLeft: 10 }}
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            <Form.Item
              name={"email"}
              label="Email"
              rules={[{ required: true }, { type: "email" }]}
              style={{ width: "100%" }}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name={"password"}
              label="Password"
              rules={[{ required: true }, { min: 8 }]}
              style={{ width: "100%", marginLeft: 10 }}
            >
              <Input type="password" />
            </Form.Item>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button style={{ width: "50%" }} type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;

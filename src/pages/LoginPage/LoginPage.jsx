import { Button, Form, Input, Radio, Typography, message } from "antd";
import React from "react";
import { useMutation } from "react-query";
import { login } from "../../api/auth";
import { routes } from "../routes";

function LoginPage() {
  const [form] = Form.useForm();

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      message.success("Logined");

      let role = form.getFieldValue("role");

      window.location.href = routes.schoolPage;
    },
    onError: () => {
      message.error("Failed to login");
    },
  });

  const handleLogin = (values) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
      role: values.role,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: 300 }}>
        <Form
          layout="vertical"
          onFinish={handleLogin}
          initialValues={{
            role: "admin",
          }}
          form={form}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          requiredMark={false}
        >
          <Form.Item
            name={"email"}
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label="Password"
            rules={[{ required: true }, { min: 8 }]}
            style={{ width: "100%" }}
          >
            <Input type="password" />
          </Form.Item>
          <Typography.Text
            style={{ display: "inline-block", marginBottom: 20 }}
          >
            as
          </Typography.Text>
          <Form.Item name={"role"}>
            <Radio.Group
              options={[
                { value: "admin", label: "Admin" },
                { value: "teacher", label: "Teacher" },
                { value: "student", label: "Student", disabled: true },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Button style={{ width: "50%" }} type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;

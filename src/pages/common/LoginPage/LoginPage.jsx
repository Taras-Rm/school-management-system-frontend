import { Button, Form, Input, Radio, Typography } from "antd";
import React from "react";

function LoginPage() {
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
        <Form layout="vertical" onFinish={() => console.log("Submit !")}>
          <Form.Item name={"email"} label="Email">
            <Input />
          </Form.Item>
          <Form.Item name={"password"} label="Password">
            <Input type="password" />
          </Form.Item>
          <Typography.Text
            style={{ display: "inline-block", marginBottom: 20 }}
          >
            as
          </Typography.Text>
          <Form.Item>
            <Radio.Group
              options={[
                { value: "admin", label: "Admin" },
                { value: "teacher", label: "Teacher" },
                { value: "student", label: "Student" },
              ]}
              optionType="button"
              defaultValue={"admin"}
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

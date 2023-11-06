import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Spin,
  message,
} from "antd";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "antd/es/form/Form";
import { getAdminSchool, updateSchool } from "../../api/school";

function EditSchoolDrawer({ isOpen, onClose }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const onDrawerClose = () => {
    form.resetFields();
    onClose();
  };

  const { data: school, isLoading: isLoadingSchool } = useQuery(
    ["school"],
    () => getAdminSchool(),
    {
      onError: (error) => {
        message.error(error);
      },
      onSuccess: (data) => {
        form.setFieldsValue(data);
      },
    }
  );

  const updateSchoolMutation = useMutation(updateSchool, {
    onSuccess: () => {
      queryClient.invalidateQueries(["school"]);
      message.success("School is updated");
      onDrawerClose();
    },
    onError: (err) => {
      message.error("Failed to update a school: " + err.response.data?.message);
    },
  });

  const handleUpdateSchool = (values) => {
    updateSchoolMutation.mutate({
      name: values.name,
    });
  };

  return (
    <Drawer
      title="Edit school info"
      open={isOpen}
      getContainer={false}
      onClose={onDrawerClose}
      width={600}
      closable={false}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onDrawerClose}>Cancel</Button>
          <Button onClick={() => form.submit()} type="primary">
            Update
          </Button>
        </Space>
      }
    >
      {isLoadingSchool ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleUpdateSchool}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={"name"}
                label="Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
}

export default EditSchoolDrawer;

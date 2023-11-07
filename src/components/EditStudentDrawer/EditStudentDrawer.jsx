import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  message,
} from "antd";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSchoolTeacher, updateSchoolTeacher } from "../../api/admins/teachers";
import dayjs from "dayjs";
import { degreesLevelsOptions, genderOptions } from "../../utils/staticData";
import { useForm } from "antd/es/form/Form";
import { getSchoolStudent, updateSchoolStudent } from "../../api/admins/students";

function EditStudentDrawer({ isOpen, onClose, id }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const onDrawerClose = () => {
    form.resetFields();
    onClose();
  };

  const { data: student, isLoading: isLoadingStudent } = useQuery(
    ["students", id],
    () => getSchoolStudent({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      onSuccess: (data) => {
        form.setFieldsValue({ ...data, dob: dayjs(data.dob) });
      },
      enabled: !!id,
    }
  );

  const updateStudentMutation = useMutation(updateSchoolStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      queryClient.invalidateQueries(["students", id]);
      message.success("Student is updated");
      onDrawerClose();
    },
    onError: (err) => {
      message.error(
        "Failed to update a student: " + err.response.data?.message
      );
    },
  });

  const handleUpdateStudent = (values) => {
    updateStudentMutation.mutate({
      id,
      name: values.name,
      surname: values.surname,
      email: values.email,
      dob: values.dob,
      address: values.address,
      phone: values.phone,
      gender: values.gender,
    });
  };

  return (
    <Drawer
      title="Edit student info"
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
      {isLoadingStudent ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleUpdateStudent}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={"name"}
                label="Name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"surname"}
                label="Surname"
                rules={[{ required: true }]}
              >
                <Input placeholder="Surname" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={"dob"}
                label="Birthday"
                rules={[{ required: true }]}
              >
                <DatePicker placeholder="Birthday" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"gender"}
                label="Gender"
                rules={[{ required: true }]}
              >
                <Select options={genderOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={"phone"}
                label="Phone"
                rules={[{ required: true, max: 10, min: 10 }]}
              >
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"email"}
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={"address"} label="Address">
                <Input placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
}

export default EditStudentDrawer;

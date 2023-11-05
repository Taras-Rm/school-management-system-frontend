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
import { getSchoolTeacher, updateSchoolTeacher } from "../../api/teachers";
import dayjs from "dayjs";
import { degreesLevelsOptions, genderOptions } from "../../utils/staticData";
import { useForm } from "antd/es/form/Form";

function EditTeacherDrawer({ isOpen, onClose, id }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const onDrawerClose = () => {
    form.resetFields();
    onClose();
  };

  const { data: teacher, isLoading: isLoadingTeacher } = useQuery(
    ["teachers", id],
    () => getSchoolTeacher({ id }),
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

  const updateTeacherMutation = useMutation(updateSchoolTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers"]);
      queryClient.invalidateQueries(["teachers", id]);
      message.success("Teacher is updated");
      onDrawerClose();
    },
    onError: (err) => {
      message.error(
        "Failed to update a teacher: " + err.response.data?.message
      );
    },
  });

  const handleUpdateTeacher = (values) => {
    updateTeacherMutation.mutate({
      id,
      name: values.name,
      surname: values.surname,
      email: values.email,
      dob: values.dob,
      address: values.address,
      phone: values.phone,
      gender: values.gender,
      degree: values.degree,
    });
  };

  return (
    <Drawer
      title="Edit teacher info"
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
      {isLoadingTeacher ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleUpdateTeacher}
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={"degree"} label="Degree">
                <Select placeholder="Degree" options={degreesLevelsOptions} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
}

export default EditTeacherDrawer;

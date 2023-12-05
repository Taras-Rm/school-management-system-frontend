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
import dayjs from "dayjs";
import { getGenderOptions } from "../../utils/staticData";
import { useForm } from "antd/es/form/Form";
import { getSchoolStudent, updateSchoolStudent } from "../../api/students";
import { RETRY_COUNT } from "../../api/api";

function EditStudentDrawer({ t, isOpen, onClose, id }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const onDrawerClose = () => {
    form.resetFields();
    onClose();
  };

  const { isLoading: isLoadingStudent } = useQuery(
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
      retry: RETRY_COUNT,
    }
  );

  const updateStudentMutation = useMutation(updateSchoolStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      queryClient.invalidateQueries(["students", id]);
      message.success(t("forms.editStudent.msgUpdated"));
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
      title={t("forms.editStudent.title")}
      open={isOpen}
      getContainer={false}
      onClose={onDrawerClose}
      width={600}
      closable={false}
      destroyOnClose
      extra={
        <Space>
          <Button onClick={onDrawerClose}>{t("buttons.cancel")}</Button>
          <Button onClick={() => form.submit()} type="primary">
            {t("buttons.update")}
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
                label={t("formFields.name")}
                rules={[{ required: true }]}
              >
                <Input placeholder={t("formFields.name")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"surname"}
                label={t("formFields.surname")}
                rules={[{ required: true }]}
              >
                <Input placeholder={t("formFields.surname")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={"dob"}
                label={t("formFields.dob")}
                rules={[{ required: true }]}
              >
                <DatePicker placeholder={t("formFields.selectDate")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"gender"}
                label={t("formFields.gender")}
                rules={[{ required: true }]}
              >
                <Select options={getGenderOptions(t)} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={"phone"}
                label={t("formFields.phone")}
                rules={[{ required: true, max: 10, min: 10 }]}
              >
                <Input placeholder={t("formFields.phone")} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"email"}
                label={t("formFields.email")}
                rules={[{ required: true, type: "email" }]}
              >
                <Input placeholder={"test@school.com"} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={"address"} label={t("formFields.address")}>
                <Input placeholder={t("formFields.address")} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
}

export default EditStudentDrawer;

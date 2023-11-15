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

function EditTeacherDrawer({ t, isOpen, onClose, id }) {
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
      title={t("forms.editTeacher.title")}
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
                <Select options={genderOptions} />
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
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={"degree"} label={t("formFields.degree")}>
                <Select
                  placeholder={t("formFields.degree")}
                  options={degreesLevelsOptions}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
}

export default EditTeacherDrawer;

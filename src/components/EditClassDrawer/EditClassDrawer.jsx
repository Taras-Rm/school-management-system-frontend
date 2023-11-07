import {
  Button,
  Col,
  Drawer,
  Form,
  Row,
  Select,
  Space,
  Spin,
  message,
} from "antd";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSchoolTeachers } from "../../api/admins/teachers";
import { classLevelOptions, classSectionOptions } from "../../utils/staticData";
import { useForm } from "antd/es/form/Form";
import { getSchoolClass, updateSchoolClass } from "../../api/admins/classes";
import TextArea from "antd/es/input/TextArea";

function EditClassDrawer({ isOpen, onClose, id }) {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const onDrawerClose = () => {
    form.resetFields();
    onClose();
  };

  const { data: classData, isLoading: isLoadingClass } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      onSuccess: (data) => {
        form.setFieldsValue(data);
      },
      enabled: !!id,
    }
  );

  const { data: teachers, teachersIsLoading } = useQuery(
    ["teachers"],
    getSchoolTeachers,
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const updateClassMutation = useMutation(updateSchoolClass, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes"]);
      queryClient.invalidateQueries(["classes", id]);
      message.success("Class is updated");
      onDrawerClose();
    },
    onError: (err) => {
      message.error("Failed to update a class: " + err.response.data?.message);
    },
  });

  const handleUpdateClass = (values) => {
    updateClassMutation.mutate({
      id: id,
      level: values.level,
      section: values.section,
      description: values.description,
      teacherId: values.teacherId,
    });
  };

  return (
    <Drawer
      title="Edit class info"
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
      {isLoadingClass ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={handleUpdateClass}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={"level"}
                label="Level"
                rules={[{ required: true }]}
              >
                <Select options={classLevelOptions} style={{ width: 200 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={"section"}
                label="Section"
                rules={[{ required: true }]}
              >
                <Select options={classSectionOptions} style={{ width: 200 }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={"teacherId"} label="Teacher">
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name={"description"} label="Description">
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Drawer>
  );
}

export default EditClassDrawer;

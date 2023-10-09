import {
  Button,
  DatePicker,
  Form,
  Modal,
  Select,
  Spin,
  Switch,
  Typography,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createStudyPeriod } from "../../../../api/studyPeriods";

function EditStudyPeriodModal({ isOpen, setIsEditStudyPeriodModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();
  const [newPeriodForm] = useForm();

  const [isAddNewPeriodOpen, setIsAddNewPeriodOpen] = useState(false);

  const {
    mutate: createStudyPeriodMutation,
    isLoading: isCreateStudyPeriodMutationLoading,
  } = useMutation(createStudyPeriod, {
    onSuccess: () => {
      // queryClient.invalidateQueries(["me"]);
      message.success("Study period is created");
      newPeriodForm.resetFields();
      setIsAddNewPeriodOpen(false);
    },
    onError: (err) => {
      message.error(err);
    },
  });

  const handleCreateStudyPeriod = (values) => {
    createStudyPeriodMutation({
      startDate: values.startDate,
      endDate: values.endDate,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsEditStudyPeriodModalOpen(false)}
      title="Edit study period"
      okText={"Edit study period"}
      okButtonProps={{ disabled: isAddNewPeriodOpen }}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={() => {}} layout="vertical">
        <Form.Item name={"period"} label="Period" rules={[{ required: true }]}>
          <Select />
        </Form.Item>
      </Form>
      <div style={{ display: "flex" }}>
        <Typography style={{ marginRight: 10 }}>Add new period</Typography>
        <Switch
          checked={isAddNewPeriodOpen}
          onChange={(e) => setIsAddNewPeriodOpen(e)}
        />
      </div>
      {isAddNewPeriodOpen && (
        <Form
          form={newPeriodForm}
          onFinish={handleCreateStudyPeriod}
          layout="vertical"
          style={{
            marginTop: 15,
            border: "1px dashed grey",
            borderRadius: "10px",
            padding: 10,
          }}
        >
          <Spin spinning={isCreateStudyPeriodMutationLoading}>
            <div style={{ display: "flex" }}>
              <Form.Item
                name={"startDate"}
                label="Start date"
                rules={[{ required: true }]}
                style={{ width: "100%" }}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name={"endDate"}
                label="End date"
                rules={[{ required: true }]}
                style={{ width: "100%", marginLeft: 10 }}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "25%", float: "right" }}
              >
                Add
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      )}
    </Modal>
  );
}

export default EditStudyPeriodModal;

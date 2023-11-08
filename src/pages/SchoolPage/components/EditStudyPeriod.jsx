import {
  Button,
  Checkbox,
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createStudyPeriod,
  getSchoolStudyPeriods,
} from "../../../api/studyPeriods";
import { formatDate } from "../../../utils/date";

function EditStudyPeriodModal({ isOpen, setIsEditStudyPeriodModalOpen }) {
  const queryClient = useQueryClient();
  const [form] = useForm();
  const [newPeriodForm] = useForm();

  const [isAddNewPeriodOpen, setIsAddNewPeriodOpen] = useState(false);

  const { data: studyPeriods = [], isLoading: isStudyPeriodsLoading } =
    useQuery(["studyPeriods"], getSchoolStudyPeriods, {
      onError: (err) => {
        message.error(
          "Failed to get school study periods: " + err.response.data?.message
        );
      },
    });

  const {
    mutate: createStudyPeriodMutation,
    isLoading: isCreateStudyPeriodMutationLoading,
  } = useMutation(createStudyPeriod, {
    onSuccess: () => {
      queryClient.invalidateQueries(["studyPeriods"]);
      message.success("Study period is created");
      newPeriodForm.resetFields();
      setIsEditStudyPeriodModalOpen(false);
    },
    onError: (err) => {
      message.error(err);
    },
  });

  const handleCreateStudyPeriod = (values) => {
    createStudyPeriodMutation({
      startDate: values.startDate,
      endDate: values.endDate,
      incrementClassesLevels: values.incrementClassesLevels,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsEditStudyPeriodModalOpen(false)}
      title="Edit study period"
      footer={null}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography style={{ marginRight: 10 }}>Period</Typography>
        <Select
          loading={isStudyPeriodsLoading}
          value={studyPeriods.find((sp) => sp.isActive)?.id}
          options={studyPeriods.map((sp) => ({
            value: sp.id,
            label: `${formatDate(new Date(sp.startDate))} - ${formatDate(
              new Date(sp.endDate)
            )}`,
            disabled: !sp.isActive,
          }))}
          style={{ width: "100%", marginTop: 10, marginBottom: 20 }}
        />
      </div>
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
            <Form.Item name={"incrementClassesLevels"} valuePropName="checked">
              <Checkbox>Increment classes levels</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "25%", float: "right" }}
              >
                Set period
              </Button>
            </Form.Item>
          </Spin>
        </Form>
      )}
    </Modal>
  );
}

export default EditStudyPeriodModal;

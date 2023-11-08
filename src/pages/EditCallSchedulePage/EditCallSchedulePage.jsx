import React from "react";
import { routes } from "../routes";
import { Link, generatePath, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Spin,
  TimePicker,
  Typography,
  message,
} from "antd";
import {
  getSchoolCallsSchedule,
  updateSchoolCallsSchedule,
} from "../../api/admins/callsSchedule";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dayjs from "dayjs";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

function EditCallSchedulePage() {
  const queryClient = useQueryClient();
  const [form] = useForm();
  const navigate = useNavigate();

  const { data: callsSchedule = [], isLoading: isCallScheduleLoading } =
    useQuery(["callsSchedule"], getSchoolCallsSchedule, {
      onError: (error) => {
        message.error(error);
      },
    });

  const getCallScheduleMaxOrder = (calls = []) => {
    let maxOrder = 0;
    for (let i = 0; i < calls.length; i++) {
      if (calls[i].orderNumber > maxOrder) {
        maxOrder = calls[i].orderNumber;
      }
    }
    return maxOrder;
  };

  const updateCallsScheduleMutation = useMutation(updateSchoolCallsSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["callsSchedule"]);
      message.success("Calls schedule is updated");
      navigate(routes.callSchedulePage);
    },
    onError: (err) => {
      message.error(
        "Failed to update calls schedule: " + err.response.data?.message
      );
    },
  });

  const handleUpdateCallsSchedule = ({ callsSchedule = [] }) => {
    let preparedValues = [];
    for (let i = 0; i < callsSchedule.length; i++) {
      const cS = callsSchedule[i];
      preparedValues.push({
        id: cS?.id,
        orderNumber: cS.orderNumber,
        startTime: cS.timeRange[0],
        endTime: cS.timeRange[1],
        schoolId: cS.schoolId,
      });
    }

    updateCallsScheduleMutation.mutate({
      callsSchedule: preparedValues,
    });
  };

  if (isCallScheduleLoading) return <Spin spinning />;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(215 215 215)",
        padding: "10px 20px",
      }}
    >
      <Breadcrumb
        items={[
          {
            title: <Link to={routes.callSchedulePage}>Schedule</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.editCallSchedulePage)}>
                Edit
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Edit schedule
      </Typography.Title>
      <div style={{ marginBottom: 20, minHeight: 32 }}></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          initialValues={{
            callsSchedule: callsSchedule.map((cS) => {
              return {
                id: cS.id,
                orderNumber: cS.orderNumber,
                schoolId: cS.schoolId,
                timeRange: [dayjs(cS.startTime), dayjs(cS.endTime)],
              };
            }),
          }}
          form={form}
          onFinish={handleUpdateCallsSchedule}
          style={{ width: "50%" }}
        >
          <Form.List name={"callsSchedule"}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "orderNumber"]}
                      style={{ width: "20%", margin: 0 }}
                    >
                      <Input disabled style={{ textAlign: "center" }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "timeRange"]}
                      rules={[
                        {
                          type: "array",
                          required: true,
                        },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <TimePicker.RangePicker format={"HH:mm"} minuteStep={5} />
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{
                        visibility: `${name + 1 <= 7 ? "hidden" : "unset"}`,
                      }}
                    />
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({
                        orderNumber:
                          getCallScheduleMaxOrder(
                            form.getFieldValue("callsSchedule")
                          ) + 1,
                      })
                    }
                    block
                    icon={<PlusOutlined />}
                  >
                    Add row
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              htmlType="submit"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditCallSchedulePage;

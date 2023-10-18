import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import React, { useMemo } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../../routes";
import {
  getClassSchedule,
  getClassSubjects,
  getSchoolClass,
} from "../../../api/classes";
import { useQuery } from "react-query";
import { getSchoolCallsSchedule } from "../../../api/callsSchedule";
import { workingWeekDays } from "../../../utils/staticData";
import { useForm } from "antd/es/form/Form";

function EditClassSchedulePage() {
  const { id } = useParams();
  const [form] = useForm();

  const { data: classData, isLoading: isLoadingClass } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const { data: classSubjects = [], isLoading: isLoadingClassSubjects } =
    useQuery(["classes", id, "subjects"], () => getClassSubjects({ id }), {
      onError: (error) => {
        message.error(error);
      },
    });

  const { data: callsSchedule = [], isLoading: isCallScheduleLoading } =
    useQuery(["callsSchedule"], getSchoolCallsSchedule, {
      onError: (error) => {
        message.error(error);
      },
    });

  const { data: classSchedule = [], isLoading: isClassScheduleLoading } =
    useQuery(
      ["classes", id, "schedule"],
      () => getClassSchedule({ classId: id }),
      {
        onError: (error) => {
          message.error(error);
        },
      }
    );

  const preparedScheduleData = useMemo(() => {
    let res = {};
    for (let i = 0; i < workingWeekDays.length; i++) {
      res[workingWeekDays[i].code] = callsSchedule.map((cS) => {
        let matchedScheduleRow = classSchedule.find(
          (clS) =>
            clS.callSchedule.orderNumber === cS.orderNumber &&
            clS.dayOfWeek === workingWeekDays[i].code
        );
        if (matchedScheduleRow) {
          return matchedScheduleRow;
        }
        return {
          callSchedule: {
            orderNumber: cS.orderNumber,
          },
        };
      });
    }
    return res;
  }, [classSchedule, workingWeekDays, callsSchedule]);

  if (isLoadingClass || isCallScheduleLoading || isClassScheduleLoading)
    return <Spin spinning />;

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
            title: <Link to={routes.adminClassesPage}>Classes</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.adminClassPage, { id })}>
                {`${classData.level}-${classData.section}`}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.adminClassSchedulePage, { id })}>
                Schedule
              </Link>
            ),
          },
          {
            title: (
              <Link
                to={generatePath(routes.adminEditClassSchedulePage, { id })}
              >
                Edit
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Edit {`${classData.level}-${classData.section}`} schedule
      </Typography.Title>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button type="primary" style={{ backgroundColor: "green" }} disabled>
          Smth
        </Button>
      </div>
      <div>
        <Form form={form} initialValues={preparedScheduleData}>
          <Row gutter={20}>
            {workingWeekDays.map((workingDay) => (
              <Col span={8} style={{ marginBottom: 20 }} key={workingDay.code}>
                <Card title={workingDay.day}>
                  <Form.Item name={workingDay.code}>
                    <Form.List name={[workingDay.code]}>
                      {(subFields) => (
                        <div>
                          {subFields.map((subField) => {
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: 15,
                                }}
                              >
                                <Typography.Text>
                                  {`${
                                    form.getFieldValue(workingDay.code)[
                                      subField.name
                                    ]?.callSchedule?.orderNumber
                                  }.`}
                                </Typography.Text>
                                <Form.Item
                                  key={subField.key}
                                  name={[subField.name, "classSubjectId"]}
                                  style={{ width: "80%", margin: 0 }}
                                >
                                  <Select
                                    placeholder="Not selected"
                                    options={classSubjects.map((cS) => ({
                                      label: cS.subject.name,
                                      value: cS.id,
                                    }))}
                                    allowClear
                                    loading={isLoadingClassSubjects}
                                  />
                                </Form.Item>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              </Col>
            ))}
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default EditClassSchedulePage;

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
import { Link, generatePath, useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes";
import {
  getClassSchedule,
  getClassSubjects,
  getSchoolClass,
  updateClassSchedule,
} from "../../api/classes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSchoolCallsSchedule } from "../../api/callsSchedule";
import { getWorkingWeekDays } from "../../utils/staticData";
import { useForm } from "antd/es/form/Form";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";

function EditClassSchedulePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [form] = useForm();
  const navigate = useNavigate();

  const workingWeekDays = getWorkingWeekDays(t);

  const { data: classData, isLoading: isLoadingClass } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const { data: classSubjects = [], isLoading: isLoadingClassSubjects } =
    useQuery(["classes", id, "subjects"], () => getClassSubjects({ id }), {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    });

  const { data: callsSchedule = [], isLoading: isCallScheduleLoading } =
    useQuery(["callsSchedule"], getSchoolCallsSchedule, {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    });

  const { data: classSchedule = [], isLoading: isClassScheduleLoading } =
    useQuery(
      ["classes", id, "schedule"],
      () => getClassSchedule({ classId: id }),
      {
        onError: (error) => {
          message.error(error);
        },
        retry: RETRY_COUNT,
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
            id: cS.id,
            orderNumber: cS.orderNumber,
          },
        };
      });
    }
    return res;
  }, [classSchedule, callsSchedule]);

  const updateClassScheduleMutation = useMutation(updateClassSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes", id, "schedule"]);
      message.success(t("pages.editCallsSchedule.msgUpdated"));
      navigate(generatePath(routes.classSchedulePage, { id }));
    },
    onError: (err) => {
      message.error(
        "Failed to update a schedule: " + err.response.data?.message
      );
    },
  });

  const handleUpdateClassSchedule = (values) => {
    let preparedValues = [];
    for (const day in values) {
      let daySchedule = values[day];
      for (const schedule of daySchedule) {
        if (schedule?.classSubjectId) {
          if (schedule?.id) {
            preparedValues.push({
              ...schedule,
            });
          } else {
            // for new schedule items
            preparedValues.push({
              classSubjectId: schedule.classSubjectId,
              dayOfWeek: day,
              callScheduleId: schedule.callSchedule.id,
            });
          }
        }
      }
    }

    updateClassScheduleMutation.mutate({
      schedule: preparedValues,
      classId: id,
    });
  };

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
            title: (
              <Link to={routes.classesPage}>
                {t("pages.editClassSchedule.breadcrumb.classes")}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.classPage, { id })}>
                {`${classData.level}-${classData.section}`}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.classSchedulePage, { id })}>
                {t("pages.editClassSchedule.breadcrumb.schedule")}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.editClassSchedulePage, { id })}>
                {t("pages.editClassSchedule.breadcrumb.edit")}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${t("pages.editClassSchedule.title")} ${classData.level}-${
          classData.section
        }`}
      </Typography.Title>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></div>
      <div>
        <Form
          form={form}
          initialValues={preparedScheduleData}
          onFinish={handleUpdateClassSchedule}
        >
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
                                    placeholder={t("common.notSelected")}
                                    options={classSubjects.map((cS) => ({
                                      label: cS.subject.name,
                                      value: cS.id,
                                      disabled: !cS.teacherId,
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
          <Form.Item>
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              htmlType="submit"
            >
              {t("buttons.update")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditClassSchedulePage;

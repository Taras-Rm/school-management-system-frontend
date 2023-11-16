import React, { useMemo } from "react";
import s from "./ClassJournalTable.module.css";
import { Button, Form, Popconfirm, Table, message } from "antd";
import {
  prepareClassJournalTableColumns,
  prepareClassJournalTableData,
} from "./classJournalHelper";
import { journalGrades } from "../../utils/staticData";
import { useMutation, useQueryClient } from "react-query";
import {
  deleteJournalStudentGrade,
  upsertJournalStudentGrade,
} from "../../api/journals";
import { useTranslation } from "react-i18next";

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  dataIndex = {},
  children,
  render,
  handleUpsertClassJournalStudentGrade,
  handleDeleteClassJournalStudentGrade,
  record,
  journalColumnId,
  disabled,
  t,
  ...restProps
}) => {
  let journalGradeId = record?.grades[Number(dataIndex[1])]
    ? record?.grades[Number(dataIndex[1])].id
    : null;

  const childNode = editable ? (
    <Popconfirm
      disabled={disabled}
      title={t("common.setGrade")}
      okText={t("buttons.set")}
      description={
        <div>
          <div style={{ marginBottom: 10 }}>
            {journalGrades.map((jG) => (
              <Button
                className={s.journalGradeButton}
                size="small"
                onClick={() =>
                  handleUpsertClassJournalStudentGrade({
                    journalGradeId,
                    journalColumnId,
                    studentId: record?.student?.id,
                    grade: jG.value,
                  })
                }
              >
                {jG.label}
              </Button>
            ))}
          </div>
          <Button
            size="small"
            disabled={!journalGradeId}
            onClick={() =>
              handleDeleteClassJournalStudentGrade({ journalGradeId })
            }
          >
            {t("buttons.delete")}
          </Button>
        </div>
      }
      showCancel={false}
    >
      <Button className={s.editableCellValueWrap}>{children}</Button>
    </Popconfirm>
  ) : (
    <div>{children}</div>
  );
  return (
    <td style={{ cursor: "pointer" }} {...restProps}>
      {childNode}
    </td>
  );
};

function ClassJournalTable({
  t,
  journalColumns,
  journalGrades,
  classId,
  journalId,
  disabled,
}) {
  const queryClient = useQueryClient();

  const upsertJournalStudentGradeMutation = useMutation(
    upsertJournalStudentGrade,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "classes",
          classId,
          "journals",
          journalId,
          "grades",
        ]);
        queryClient.invalidateQueries(["journals", journalId, "grades"]);
      },
      onError: (err) => {
        message.error("Failed to set a grade: " + err.response.data?.message);
      },
    }
  );

  const handleUpsertJournalStudentGrade = ({
    journalGradeId,
    journalColumnId,
    studentId,
    grade,
  }) => {
    upsertJournalStudentGradeMutation.mutate({
      journalGradeId,
      journalId: Number(journalId),
      journalColumnId,
      studentId,
      grade,
    });
  };

  const deleteJournalStudentGradeMutation = useMutation(
    deleteJournalStudentGrade,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "classes",
          classId,
          "journals",
          journalId,
          "grades",
        ]);
        queryClient.invalidateQueries(["journals", journalId, "grades"]);
      },
      onError: (err) => {
        message.error(
          "Failed to delete a grade: " + err.response.data?.message
        );
      },
    }
  );

  const handleDeleteJournalStudentGrade = ({ journalGradeId }) => {
    deleteJournalStudentGradeMutation.mutate({
      journalGradeId,
      journalId: Number(journalId),
    });
  };

  const tableColumns = useMemo(() => {
    return prepareClassJournalTableColumns(
      t,
      journalColumns,
      handleUpsertJournalStudentGrade,
      handleDeleteJournalStudentGrade,
      disabled
    );
  }, [journalColumns]);

  const tableData = useMemo(() => {
    return prepareClassJournalTableData(journalGrades);
  }, [journalGrades]);

  return (
    <Table
      components={{ body: { row: EditableRow, cell: EditableCell } }}
      columns={tableColumns}
      dataSource={tableData}
      scroll={{ x: tableColumns.length * 60 }}
      size="small"
      pagination={false}
      bordered
      rowClassName={() => s.editableRow}
    />
  );
}

export default ClassJournalTable;

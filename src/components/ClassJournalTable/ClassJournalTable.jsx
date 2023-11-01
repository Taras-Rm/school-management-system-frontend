import React, { useMemo } from "react";
import s from "./ClassJournalTable.module.css";
import { Button, Form, Popconfirm, Table, message } from "antd";
import {
  prepareClassJournalTableColumns,
  prepareClassJournalTableData,
} from "./classJournalHelper";
import { journalGrades } from "../../utils/staticData";
import { useMutation, useQueryClient } from "react-query";
import { upsertClassJournalStudentGrade } from "../../api/classes";

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
  record,
  journalColumnId,
  ...restProps
}) => {
  let journalGradeId = record?.grades[Number(dataIndex[1])]
    ? record?.grades[Number(dataIndex[1])].id
    : null;

  const childNode = editable ? (
    <Popconfirm
      title="Please set grade"
      description={
        <div>
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
              {jG.value}
            </Button>
          ))}
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
  journalColumns,
  journalGrades,
  classId,
  journalId,
}) {
  const queryClient = useQueryClient();

  const upsertClassJournalStudentGradeMutation = useMutation(
    upsertClassJournalStudentGrade,
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          "classes",
          classId,
          "journals",
          journalId,
          "grades",
        ]);
      },
      onError: (err) => {
        message.error("Failed to set a grade: " + err.response.data?.message);
      },
    }
  );

  const handleUpsertClassJournalStudentGrade = ({
    journalGradeId,
    journalColumnId,
    studentId,
    grade,
  }) => {
    upsertClassJournalStudentGradeMutation.mutate({
      classId,
      journalGradeId,
      journalId: Number(journalId),
      journalColumnId,
      studentId,
      grade,
    });
  };

  const tableColumns = useMemo(() => {
    return prepareClassJournalTableColumns(
      journalColumns,
      handleUpsertClassJournalStudentGrade
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

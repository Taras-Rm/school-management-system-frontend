import React, { useContext, useMemo, useState } from "react";
import s from "./ClassJournalTable.module.css";
import { Button, Form, Popconfirm, Table } from "antd";
import {
  prepareClassJournalTableColumns,
  prepareClassJournalTableData,
} from "./classJournalHelper";

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
  dataIndex,
  children,
  render,
  handleSave,
  record,
  ...restProps
}) => {
  const form = useContext(EditableContext);
  const childNode = editable ? (
    <Button
      onClick={() => {
        console.log("open modal");
      }}
      className={s.editableCellValueWrap}
    >
      {children}
    </Button>
  ) : (
    <div>{children}</div>
  );
  return (
    <td style={{ cursor: "pointer" }} {...restProps}>
      {childNode}
    </td>
  );
};

function ClassJournalTable({ journalColumns, journalGrades }) {
  const tableColumns = useMemo(() => {
    return prepareClassJournalTableColumns(journalColumns);
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

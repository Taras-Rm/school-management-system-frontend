import React, { useMemo } from "react";
import s from "./ClassJournalTable.module.css";
import { Table } from "antd";
import {
  prepareClassJournalTableColumns,
  prepareClassJournalTableData,
} from "./classJournalHelper";

function ClassJournalTable({ journalColumns, journalGrades }) {
  const tableColumns = useMemo(() => {
    return prepareClassJournalTableColumns(journalColumns);
  }, [journalColumns]);

  const tableData = useMemo(() => {
    return prepareClassJournalTableData(journalGrades);
  }, [journalGrades]);

  return (
    <Table
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

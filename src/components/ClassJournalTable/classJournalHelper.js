export function prepareClassJournalTableColumns(
  journalColumns = [],
  handleUpsertClassJournalStudentGrade,
  handleDeleteClassJournalStudentGrade,
  disabled
) {
  let columns = [];
  // student name
  columns.push({
    title: "Name",
    dataIndex: ["student"],
    fixed: "left",
    width: 150,
    render: (value, _) => {
      return `${value.name} ${value.surname}`;
    },
  });
  // columns (dates, ...)
  for (let i = 0; i < journalColumns.length; i++) {
    const title =
      journalColumns[i].type === "date"
        ? prepareCellDate(journalColumns[i].value)
        : journalColumns[i].value;
    const dataIndex = ["grades", `${journalColumns[i].id}`, "grade"];

    columns.push({
      title,
      dataIndex,
      align: "center",
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex,
        title,
        disabled,
        handleUpsertClassJournalStudentGrade,
        handleDeleteClassJournalStudentGrade,
        journalColumnId: journalColumns[i].id,
      }),
    });
  }
  return columns;
}

export function prepareClassJournalTableData(journalGrades = []) {
  let rows = [];

  for (const row of journalGrades) {
    rows.push({
      ...row,
      grades: row.grades.reduce(
        (a, v) => ({ ...a, [v.journalColumnId]: { ...v } }),
        {}
      ),
    });
  }

  return rows;
}

function prepareCellDate(date) {
  // YYYY-MM-DD to DD-MM
  let dateParams = date.split("-");
  return `${dateParams[2]}.${dateParams[1]}`;
}

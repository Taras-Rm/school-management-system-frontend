export function prepareClassJournalTableColumns(journalColumns = []) {
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
    columns.push({
      title:
        journalColumns[i].type === "date"
          ? prepareCellDate(journalColumns[i].value)
          : journalColumns[i].value,
      dataIndex: ["grades", `${journalColumns[i].id}`, "grade"],
      align: "center",
      render: (value, _) => {
        return value;
      },
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

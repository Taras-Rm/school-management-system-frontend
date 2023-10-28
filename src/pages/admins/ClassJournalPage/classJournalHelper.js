export function prepareClassJournalTableColumns(journalGrades = []) {
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
  // dates
  for (let i = 0; i < journalGrades.length; i++) {
    for (let date in journalGrades[i].grades) {
      columns.push({
        title: prepareCellDate(date),
        dataIndex: ["grades", date],
        align: "center",
        render: (value, _) => {
          return value;
        },
      });
    }
    // only first row
    break;
  }
  return columns;
}

export function prepareCellDate(date) {
  // YYYY-MM-DD to DD-MM
  let dateParams = date.split("-");
  return `${dateParams[2]}.${dateParams[1]}`;
}

export function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  let formattedDate = day + "/" + month + "/" + year;

  return formattedDate;
}

export function formatTime(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;

  let formattedTime = hour + ":" + minute;

  return formattedTime;
}

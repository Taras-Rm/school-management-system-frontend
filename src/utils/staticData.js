import { LOCALES } from "../i18n/constants";

export const getGenderOptions = (t) => {
  return [
    { value: "male", label: t("genders.male") },
    { value: "female", label: t("genders.female") },
  ];
};

export const classLevelOptions = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 11,
    label: "11",
  },
];

export const classSectionOptions = [
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
];

export const getWorkingWeekDays = (t) => {
  return [
    {
      code: "mon",
      day: t("days.monday"),
    },
    {
      code: "tue",
      day: t("days.tuesday"),
    },
    {
      code: "wed",
      day: t("days.wednesday"),
    },
    {
      code: "thu",
      day: t("days.thursday"),
    },
    {
      code: "fri",
      day: t("days.friday"),
    },
  ];
};

export const journalGrades = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "H", label: "H" },
];

export const getDegreesLevelsOptions = (t) => {
  return [
    { value: "basic", label: t("degreesLevels.basic") },
    { value: "specialist", label: t("degreesLevels.specialist") },
  ];
};

export const languagesOptions = [
  { value: LOCALES.EN, label: "Eng" },
  { value: LOCALES.UK, label: "Ukr" },
];

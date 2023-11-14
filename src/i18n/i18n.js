import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      buttons: {
        cancel: "Cancel",
        update: "Update",
        change: "Change",
        set: "Set",
      },
      formFields: {
        name: "Name",
        startDate: "Start date",
        endDate: "End date",
        selectDate: "Select date",
        period: "Period",
      },
      common: {
        school: "School",
        teachers: "Teachers",
        students: "Students",
        classes: "Classes",
        subjects: "Subjects",
        count: "Count",
        studyPeriod: "Study period",
        schedule: "Schedule",
        journals: "Journals",
        myClasses: "My classes",
      },
      forms: {
        editSchool: {
          button: "Edit school",
          title: "Edit school information",
          descrp: "Period",
          addNew: "Add new period",
        },
        editStudyPeriod: {
          button: "Edit school",
          title: "Study period",
          increment: "Increment classes levels",
          addNew: "Add new period",
        },
      },
      pages: {
        school: {
          breadcrumb: {
            school: "School",
          },
        },
      },
    },
  },
  uk: {
    translation: {
      buttons: {
        cancel: "Скасувати",
        update: "Оновити",
        change: "Змінити",
        set: "Встановити",
      },
      formFields: {
        name: "Назва",
        startDate: "Початкова дата",
        endDate: "Кінцева дата",
        selectDate: "Обрати дату",
        period: "Період",
      },
      common: {
        school: "Школа",
        teachers: "Вчителі",
        students: "Учні",
        classes: "Класи",
        subjects: "Предмети",
        count: "Кількість",
        studyPeriod: "Навчальний період",
        schedule: "Розклад",
        journals: "Журнали",
        myClasses: "Мої класи",
      },
      forms: {
        editSchool: {
          button: "Редагувати школу",
          title: "Редагувати інформацію про школу",
          descrp: "Період",
          addNew: "Додати новий період",
        },
        editStudyPeriod: {
          title: "Редагувати навчальний період",
          increment: "Перевести класи на наступний рік",
          addNew: "Додати новий період",
        },
      },
      pages: {
        school: {
          breadcrumb: {
            school: "Школа",
          },
        },
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uk",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

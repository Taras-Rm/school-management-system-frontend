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
        ok: "Ok",
        add: "Add",
      },
      formFields: {
        name: "Name",
        surname: "Surname",
        startDate: "Start date",
        endDate: "End date",
        selectDate: "Select date",
        period: "Period",
        dob: "Date of birth",
        gender: "Gender",
        phone: "Phone",
        email: "Email",
        address: "Address",
        degree: "Degree",
        profile: "Profile",
        speciality: "Speciality",
        contacts: "Contacts",
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
        addTeacher: {
          title: "Add new teacher",
        },
        editTeacher: {
          title: "Edit teacher information",
        },
      },
      tables: {
        name: "Name",
        email: "Email",
        action: "Action",
        edit: "Edit",
        delete: "Delete",
      },
      pages: {
        school: {
          breadcrumb: {
            school: "School",
          },
        },
        teachers: {
          breadcrumb: {
            teachers: "Teachers",
          },
          title: "Teachers",
          addTeacherBtn: "Add teacher",
          table: {
            deleteTeacherConfirm: "Do you really want to delete a teacher ?",
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
        ok: "Так",
        add: "Додати",
      },
      formFields: {
        name: "Імʼя",
        surname: "Прізвище",
        startDate: "Початкова дата",
        endDate: "Кінцева дата",
        selectDate: "Обрати дату",
        period: "Період",
        dob: "Дата народження",
        gender: "Стать",
        phone: "Телефон",
        email: "Емейл",
        address: "Адреса",
        degree: "Рівень",
        profile: "Профіль",
        speciality: "Спеціальність",
        contacts: "Контакти",
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
        addTeacher: {
          title: "Додати нового вчителя",
        },
        editTeacher: {
          title: "Редагувати інформацію про вчителя",
        },
      },
      tables: {
        name: "Назва",
        email: "Емейл",
        action: "Дія",
        edit: "Редагувати",
        delete: "Видалити",
      },
      pages: {
        school: {
          breadcrumb: {
            school: "Школа",
          },
        },
        teachers: {
          breadcrumb: {
            teachers: "Вчителі",
          },
          title: "Вчителі",
          addTeacherBtn: "Додати вчителя",
          table: {
            editTeacher: "Редагувати вчителя",
            deleteTeacher: "Видалити вчителя",
            deleteTeacherConfirm: "Ви справді бажаєте видалити вчителя ?",
          },
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uk",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

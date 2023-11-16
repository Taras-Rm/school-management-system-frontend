import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      days: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
      },
      buttons: {
        cancel: "Cancel",
        update: "Update",
        change: "Change",
        set: "Set",
        ok: "Ok",
        add: "Add",
        delete: "Delete",
        assign: "Assign",
        create: "Create",
      },
      formFields: {
        name: "Name",
        name2: "Name",
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
        class: "Class",
        level: "Level",
        section: "Section",
        description: "Description",
        teacher: "Teacher",
        select: "Select",
        startTime: "Start",
        endTime: "Finish",
        subject: "Subject",
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
        notDefined: "not defined",
        setGrade: "Please set grade",
        notSelected: "Not swlwcted",
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
        addStudent: {
          title: "Add new student",
        },
        editStudent: {
          title: "Edit student information",
        },
        addClass: {
          title: "Add new class",
        },
        editClass: {
          title: "Edit class information",
        },
        addSubject: {
          title: "Add new subject",
        },
        editSubject: {
          title: "Edit subject",
        },
        assignStudentsToClass: {
          title: "Assign students",
          noData: "No students",
        },
        addClassSubject: {
          title: "Add subject to class",
        },
        editClassSubject: {
          title: "Edit class subject",
        },
        createClassJournals: {
          title: "Create journals",
          studyPeriod: "Study period",
          description1:
            "It is neccessary set up correct schedule for subjects you want to create journals",
          description2:
            "Please, select subjects for which you want to create journals",
        },
      },
      tables: {
        name: "Name",
        email: "Email",
        action: "Action",
        edit: "Edit",
        delete: "Delete",
        class: "Class",
        number: "Number",
        time: "Time",
        subject: "Subject",
        teacher: "Teacher",
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
        students: {
          breadcrumb: {
            students: "Students",
          },
          title: "Students",
          addStudentBtn: "Add student",
          table: {
            deleteStudentConfirm: "Do you really want to delete a student ?",
          },
        },
        classes: {
          breadcrumb: {
            classes: "Classes",
          },
          title: "Classes",
          addClassBtn: "Add class",
          card: {
            classTeacher: "Class teacher",
            numberOfStudents: "Number of students",
            deleteClassConfirm: "Do you really want to delete a class ?",
          },
        },
        subjects: {
          breadcrumb: {
            subjects: "Subjects",
          },
          title: "Subjects",
          addSubjectBtn: "Add subject",
          list: {
            deleteSubjectConfirm: "Do you really want to delete a subject ?",
          },
        },
        callsSchedule: {
          breadcrumb: {
            callsSchedule: "Calls schedule",
          },
          title: "Calls schedule",
          editCallsScheduleBtn: "Edit",
        },
        editCallsSchedule: {
          breadcrumb: {
            callsSchedule: "Calls schedule",
            edit: "Edit",
          },
          title: "Edit calls schedule",
        },
        journals: {
          breadcrumb: {
            journals: "Journals",
          },
          title: "Journals",
          card: {
            teacher: "Teacher",
          },
        },
        journal: {
          breadcrumb: {
            journals: "Journals",
          },
        },
        class: {
          breadcrumb: {
            classes: "Classes",
          },
          title: "class",
          assignStudentsBtn: "Assign students",
          subjectsBtn: "Subjects",
          scheduleBtn: "Schedule",
          journalsBtn: "Journals",
          classTeacher: "Class teacher",
          table: {
            unassignStudent: "Unassign student from class",
          },
        },
        classSubjects: {
          breadcrumb: {
            classes: "Classes",
            subjects: "Subjects",
          },
          title: "Subjects",
          addClassSubjectBtn: "Add subject",
          table: {
            deleteClassSubjectConfirm:
              "Do you really want to delete a class subject ?",
          },
        },
        classSchedule: {
          breadcrumb: {
            classes: "Classes",
            schedule: "Schedule",
          },
          title: "schedule",
          editSheduleBtn: "Edit schedule",
          table: {},
        },
        editClassSchedule: {
          breadcrumb: {
            classes: "Classes",
            schedule: "Schedule",
            edit: "Edit",
          },
          title: "Edit schedule",
        },
        classJournals: {
          breadcrumb: {
            classes: "Classes",
            journals: "Journals",
          },
          title: "journals",
          createJournalBtn: "Create journal",
          teacher: "Teacher",
        },
      },
    },
  },
  uk: {
    translation: {
      days: {
        monday: "Понеділок",
        tuesday: "Вівторок",
        wednesday: "Середа",
        thursday: "Четвер",
        friday: "Пʼятниця",
      },
      buttons: {
        cancel: "Скасувати",
        update: "Оновити",
        change: "Змінити",
        set: "Встановити",
        ok: "Так",
        add: "Додати",
        delete: "Видалити",
        assign: "Додати",
        create: "Створити",
      },
      formFields: {
        name: "Імʼя",
        name2: "Назва",
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
        class: "Клас",
        level: "Рівень",
        section: "Літера",
        description: "Опис",
        teacher: "Вчитель",
        select: "Вибрати",
        startTime: "Початок",
        endTime: "Завершення",
        subject: "Предмет",
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
        notDefined: "не призначено",
        setGrade: "Будь ласка виберіть оцінку",
        notSelected: "Не обрано",
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
        addStudent: {
          title: "Додати нового учня",
        },
        editStudent: {
          title: "Редагувати інформацію про учня",
        },
        addClass: {
          title: "Додати новий клас",
        },
        editClass: {
          title: "Редагувати інформацію про клас",
        },
        addSubject: {
          title: "Додати новий предмет",
        },
        editSubject: {
          title: "Редагувати інформацію про предмет",
        },
        assignStudentsToClass: {
          title: "Додати учнів",
          noData: "Немає учнів",
        },
        addClassSubject: {
          title: "Додати предмет до класу",
        },
        editClassSubject: {
          title: "Редагувати предмет класу",
        },
        createClassJournals: {
          title: "Створити журнали",
          studyPeriod: "Навчальний період",
          description1:
            "Необхідно створити правильний розклад для предметів, перед створенням журналів",
          description2:
            "Будь ласка оберіть предмети, для яких бажаєте створити журнали",
        },
      },
      tables: {
        name: "Назва",
        email: "Емейл",
        action: "Дія",
        edit: "Редагувати",
        delete: "Видалити",
        class: "Клас",
        number: "Номер",
        time: "Час",
        subject: "Предмет",
        teacher: "Вчитель",
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
        students: {
          breadcrumb: {
            students: "Учні",
          },
          title: "Учні",
          addStudentBtn: "Додати учня",
          table: {
            deleteStudentConfirm: "Ви справді бажаєте видалити учня ?",
          },
        },
        classes: {
          breadcrumb: {
            classes: "Класи",
          },
          title: "Класи",
          addClassBtn: "Додати клас",
          card: {
            classTeacher: "Класний керівник",
            numberOfStudents: "Кількість учнів",
            deleteClassConfirm: "Ви справді бажаєте видалити клас ?",
          },
        },
        subjects: {
          breadcrumb: {
            subjects: "Предмети",
          },
          title: "Предмети",
          addSubjectBtn: "Додати предмет",
          list: {
            deleteSubjectConfirm: "Ви справді бажаєте видалити предмет ?",
          },
        },
        callsSchedule: {
          breadcrumb: {
            callsSchedule: "Розклад дзвінків",
          },
          title: "Розклад дзвінків",
          editCallsScheduleBtn: "Редагувати",
        },
        editCallsSchedule: {
          breadcrumb: {
            callsSchedule: "Розклад дзвінків",
            edit: "Редагувати",
          },
          title: "Редагувати розклад дзвінків",
        },
        journals: {
          breadcrumb: {
            journals: "Журнали",
          },
          title: "Журнали",
          card: {
            teacher: "Вчитель",
          },
        },
        journal: {
          breadcrumb: {
            journals: "Журнали",
          },
        },
        class: {
          breadcrumb: {
            classes: "Класи",
          },
          title: "клас",
          assignStudentsBtn: "Додати учнів",
          subjectsBtn: "Предмети",
          scheduleBtn: "Розклад",
          journalsBtn: "Журнали",
          classTeacher: "Класний керівник",
          table: {
            unassignStudent: "Видалити учня з класу",
          },
        },
        classSubjects: {
          breadcrumb: {
            classes: "Класи",
            subjects: "Предмети",
          },
          title: "Предмети",
          addClassSubjectBtn: "Додати предмет",
          table: {
            deleteClassSubjectConfirm:
              "Ви справді бажаєте видалити предмет з класу ?",
          },
        },
        classSchedule: {
          breadcrumb: {
            classes: "Класи",
            schedule: "Розклад",
          },
          title: "розклад",
          editSheduleBtn: "Редагувати розклад",
          table: {},
        },
        editClassSchedule: {
          breadcrumb: {
            classes: "Класи",
            schedule: "Розклад",
            edit: "Редагувати",
          },
          title: "Редагувати розклад",
        },
        classJournals: {
          breadcrumb: {
            classes: "Класи",
            journals: "Журнали",
          },
          title: "журнали",
          createJournalBtn: "Створити журнал",
          teacher: "Вчитель",
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

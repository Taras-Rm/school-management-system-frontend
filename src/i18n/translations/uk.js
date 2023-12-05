export const uk = {
  days: {
    monday: "Понеділок",
    tuesday: "Вівторок",
    wednesday: "Середа",
    thursday: "Четвер",
    friday: "Пʼятниця",
  },
  genders: {
    male: "Чоловік",
    female: "Жінка",
  },
  degreesLevels: {
    basic: "Молодший вчитель",
    specialist: "Старший вчитель",
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
      msgUpdated: "Школу оновлено",
    },
    editStudyPeriod: {
      title: "Редагувати навчальний період",
      increment: "Перевести класи на наступний рік",
      addNew: "Додати новий період",
      msgUpdated: "Навчальний період встановлено",
    },
    addTeacher: {
      title: "Додати нового вчителя",
      msgAdded: "Вчителя додано",
    },
    editTeacher: {
      title: "Редагувати інформацію про вчителя",
      msgUpdated: "Інформацію про вчителя оновлено",
    },
    addStudent: {
      title: "Додати нового учня",
      msgAdded: "Учня додано",
    },
    editStudent: {
      title: "Редагувати інформацію про учня",
      msgUpdated: "Інформацію про учня оновлено",
    },
    addClass: {
      title: "Додати новий клас",
      msgCreated: "Клас створено",
    },
    editClass: {
      title: "Редагувати інформацію про клас",
      msgUpdated: "Клас оновлено",
    },
    addSubject: {
      title: "Додати новий предмет",
    },
    editSubject: {
      title: "Редагувати інформацію про предмет",
      msgUpdated: "Предмет оновлено",
    },
    assignStudentsToClass: {
      title: "Додати учнів",
      noData: "Немає учнів",
      msgAssigned: "Учнів додано до класу",
    },
    addClassSubject: {
      title: "Додати предмет до класу",
      msgAdded: "Додано предмет до класу",
    },
    editClassSubject: {
      title: "Редагувати предмет класу",
      msgUpdated: "Предмет класу оновлено",
    },
    createClassJournals: {
      title: "Створити журнали",
      studyPeriod: "Навчальний період",
      description1:
        "Необхідно створити правильний розклад для предметів, перед створенням журналів",
      description2:
        "Будь ласка оберіть предмети, для яких бажаєте створити журнали",
      msgCreated: "Журнали створено",
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
        msgDeleted: "Вчителя видалено",
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
        msgDeleted: "Учня видалено",
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
        msgDeleted: "Клас видалено",
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
        msgCreated: "Предмет створено",
        msgDeleted: "Предмет видалено",
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
      msgUpdated: "Розклад дзвінків оновлено",
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
        msgDeleted: "Предмет з класу видалено",
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
    classJournal: {
      breadcrumb: {
        classes: "Класи",
        journals: "Журнали",
      },
      title: "Журнал",
    },
  },
};

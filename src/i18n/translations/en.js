export const en = {
  days: {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
  },
  genders: {
    male: "Male",
    female: "Female",
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
      msgUpdated: "School is updated",
    },
    editStudyPeriod: {
      button: "Edit school",
      title: "Study period",
      increment: "Increment classes levels",
      addNew: "Add new period",
      msgUpdated: "Study period is setted",
    },
    addTeacher: {
      title: "Add new teacher",
      msgAdded: "Teacher is added",
    },
    editTeacher: {
      title: "Edit teacher information",
      msgUpdated: "Information about teacher updated",
    },
    addStudent: {
      title: "Add new student",
      msgAdded: "Student is added",
    },
    editStudent: {
      title: "Edit student information",
      msgUpdated: "Information about student updated",
    },
    addClass: {
      title: "Add new class",
      msgCreated: "Class is created",
    },
    editClass: {
      title: "Edit class information",
      msgUpdated: "Class is updated",
    },
    addSubject: {
      title: "Add new subject",
    },
    editSubject: {
      title: "Edit subject",
      msgUpdated: "Subject is updated",
    },
    assignStudentsToClass: {
      title: "Assign students",
      noData: "No students",
      msgAssigned: "Students are assigned to class",
    },
    addClassSubject: {
      title: "Add subject to class",
      msgAdded: "Added subject to class",
    },
    editClassSubject: {
      title: "Edit class subject",
      msgUpdated: "Class subject is updated",
    },
    createClassJournals: {
      title: "Create journals",
      studyPeriod: "Study period",
      description1:
        "It is neccessary set up correct schedule for subjects you want to create journals",
      description2:
        "Please, select subjects for which you want to create journals",
      msgCreated: "Journals are created",
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
        msgDeleted: "Teacher is deleted",
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
        msgDeleted: "Student is deleted",
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
        msgDeleted: "Class is deleted",
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
        msgCreated: "Subject is created",
        msgDeleted: "Subject is deleted",
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
      msgUpdated: "Calls schedule is updated",
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
        msgDeleted: "Class subject is deleted",
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
    classJournal: {
      breadcrumb: {
        classes: "Classes",
        journals: "Journals",
      },
      title: "Journal",
    },
  },
};

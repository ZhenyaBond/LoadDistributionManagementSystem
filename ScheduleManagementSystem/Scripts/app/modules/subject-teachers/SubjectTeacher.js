export default class SubjectTeacher {
    constructor(serverSubjectTeacher, ko) {
        this.Id = {
            value: serverSubjectTeacher ? serverSubjectTeacher.SubjectTeacherID : -1,
            friendlyName: "ID",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.stream = {
            value: serverSubjectTeacher ? serverSubjectTeacher.StreamID : "",
            friendlyName: "Номер потока",
            type: "select",
            data: "streams",
            gridCenter: true
        };
        this.teacher = {
            value: serverSubjectTeacher ? serverSubjectTeacher.TeacherFullName : "",
            valueId: serverSubjectTeacher ? serverSubjectTeacher.TeacherID : -1,
            friendlyName: "Преподаватель",
            type: "select",
            data: "teachers",
            gridCenter: true
        };
        this.subject = {
            value: serverSubjectTeacher ? serverSubjectTeacher.SubjectFullName : "",
            valueId: serverSubjectTeacher ? serverSubjectTeacher.SubjectID : -1,
            friendlyName: "Дисциплина",
            type: "select",
            data: "subjects",
            gridCenter: true
        };
        

        this.observe(ko);
    }

    observe(ko) {
        Object.keys(this).forEach(key => {
            this[key].value = ko.observable(this[key].value);
            if (this[key].type === "select") {
                this[key].valueId = ko.observable(this[key].valueId);
            }
        });
    }

    getViewModel() {
        return {
            SubjectTeacherID: this.Id.value(),
            StreamID: this.stream.value(),
            TeacherID: this.teacher.value(),
            SubjectID: this.subject.value()
        };
    }

    updateId(newId) {
        this.Id.value(newId);
    }
} 
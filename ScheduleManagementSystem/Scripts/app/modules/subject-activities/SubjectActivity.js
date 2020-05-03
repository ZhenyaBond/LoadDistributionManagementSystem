export default class SubjectActivity {
    constructor(serverSubjectActivity, ko) {
        this.id = {
            value: serverSubjectActivity ? serverSubjectActivity.SubjActID : -1,
            friendlyName: "ID",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.subject = {
            value: serverSubjectActivity ? serverSubjectActivity.SubjectFullName : "",
            valueId: serverSubjectActivity ? serverSubjectActivity.SubjectID : -1,
            friendlyName: "Дисциплина",
            type: "select",
            data: "subjects",
            gridCenter: true
        };
        this.activity = {
            value: serverSubjectActivity ? serverSubjectActivity.ActivityNameRu : "",
            valueId: serverSubjectActivity ? serverSubjectActivity.ActivityID : -1,
            friendlyName: "Активность",
            type: "select",
            data: "activities",
            gridCenter: true
        };
        this.semester = {
            value: serverSubjectActivity ? serverSubjectActivity.SemesterNameRu : "",
            valueId: serverSubjectActivity ? serverSubjectActivity.SemesterID : -1,
            friendlyName: "Семестр",
            type: "select",
            data: "semesters",
            gridCenter: true
        };
        this.profession = {
            value: serverSubjectActivity ? serverSubjectActivity.ProfessionName : "",
            valueId: serverSubjectActivity ? serverSubjectActivity.ProfessionID : -1,
            friendlyName: "Специальность",
            type: "select",
            data: "professions",
            gridCenter: true
        };
        this.hour = {
            value: serverSubjectActivity ? serverSubjectActivity.Hour : "",
            friendlyName: "Часы",
            type: "text",
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
            SubjActID: this.id.value(),
            SubjectID: this.subject.value(),
            ActivityID: this.activity.value(),
            SemesterID: this.semester.value(),
            ProfessionID: this.profession.value(),
            Hour: this.hour.value()
        };
    }

    updateId(newId) {
        this.id.value(newId);
    }
} 
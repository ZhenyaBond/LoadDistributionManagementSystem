export default class Stream {
    constructor(serverStream, ko) {
        this.Id = {
            value: serverStream ? serverStream.ID : -1,
            friendlyName: "ID",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.stream = {
            value: serverStream ? serverStream.StreamID : "",
            friendlyName: "№ п/п",
            type: "text",
            gridCenter: true
        };
        this.profession = {
            value: serverStream ? serverStream.ProfessionName : "",
            valueId: serverStream ? serverStream.ProfessionID : -1,
            friendlyName: "Специальность",
            type: "select",
            data: "professions",
            gridCenter: true
        };
        this.subject = {
            value: serverStream ? serverStream.StreamSubject : "",
            valueId: serverStream ? serverStream.SubjectID : -1,
            friendlyName: "Дисциплина",
            type: "select",
            data: "subjects",
            gridCenter: true
        };
        this.semester = {
            value: serverStream ? serverStream.SemesterID : -1,
            friendlyName: "Семестр",
            type: "select",
            data: "semesters",
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
            ID: this.Id.value(),
            StreamId: this.stream.value(),
            ProfessionName: this.profession.value(),
            StreamSubject: this.subject.value(),
            SemesterID: this.semester.value()
        };
    }

    updateId(newId) {
        this.Id.value(newId);
    }
} 
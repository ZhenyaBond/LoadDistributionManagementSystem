export default class SubjectProfession {
    constructor(serverSubjectProfession, ko) {
        this.Id = {
            value: serverSubjectProfession ? serverSubjectProfession.SubjectProfessionID : -1,
            friendlyName: "ID",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.profession = {
            value: serverSubjectProfession ? serverSubjectProfession.ProfessionName : "",
            valueId: serverSubjectProfession ? serverSubjectProfession.ProfessionID : -1,
            friendlyName: "Специальность",
            type: "select",
            data: "professions",
            gridCenter: true
        };
        this.subject = {
            value: serverSubjectProfession ? serverSubjectProfession.SubjectFullName : "",
            valueId: serverSubjectProfession ? serverSubjectProfession.SubjectID : -1,
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
            SubjectProfessionID: this.Id.value(),
            ProfessionID: this.profession.value(),
            SubjectID: this.subject.value()
        };
    }

    updateId(newId) {
        this.Id.value(newId);
    }
} 
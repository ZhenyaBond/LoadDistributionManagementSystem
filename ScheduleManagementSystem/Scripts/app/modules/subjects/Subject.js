export default class Subject {
    constructor(serverSubject, ko) {
        this.id = {
            value: serverSubject ? serverSubject.Id : -1,
            friendlyName: "Id",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.discipline = {
            value: serverSubject ? serverSubject.DisciplineName: "",
            friendlyName: "Дисциплина",
            type: "text"
        };
        this.specialization = {
            value: serverSubject ? serverSubject.specName : "",
            friendlyName: "Специальность",
            type: "text",
            gridCenter: true
        };
        this.examen = {
            value: serverSubject ? serverSubject.ExamSem : "",
            friendlyName: "Экзамен",
            type: "text",
            gridCenter: true
        };
        this.credit = {
            value: serverSubject ? serverSubject.CreditSem : "",
            friendlyName: "Зачет",
            type: "text",
            gridCenter: true
        };
        this.totalHour = {
            value: serverSubject ? serverSubject.TotalHour : "",
            friendlyName: "Всего",
            type: "text",
            gridCenter: true
        };
        this.totalLections = {
            value: serverSubject ? serverSubject.LecturesHour : "",
            friendlyName: "Лекции",
            type: "text",
            gridCenter: true
        };
        this.totalLabs = {
            value: serverSubject ? serverSubject.LabHour : "",
            friendlyName: "Лабораторные",
            type: "text",
            gridCenter: true
        };
        this.totalPract = {
            value: serverSubject ? serverSubject.PracticHour : "",
            friendlyName: "Практические",
            type: "text",
            gridCenter: true
        };
        this.totalSeminar = {
            value: serverSubject ? serverSubject.SeminarHour : "",
            friendlyName: "Семинары",
            type: "text",
            gridCenter: true
        };
        
        this.observe(ko);
    }

    getViewModel() {
        return {
            Id: this.id.value(),
            DisciplineName: this.discipline.value(),
            SpecName: this.specialization.value(),
            ExamSem: this.examen.value(),
            CreditSem: this.credit.value(),
            TotalHour: this.totalHour.value(),
            LecturesHour: this.totalLections.value(),
            Labhour: this.totalLabs.value(),
            PracticHour: this.totalPract.value(),
            SeminarHour: this.totalSeminar.value()
        };
    }

    observe(ko) {
        Object.keys(this).forEach(key => {
            this[key].value = ko.observable(this[key].value);
            if (this[key].type === "select") {
                this[key].valueId = ko.observable(this[key].valueId);
            }
        });
    }
}
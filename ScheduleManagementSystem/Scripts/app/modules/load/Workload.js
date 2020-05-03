export default class Workload {
    constructor(serverWorkload, ko) {
        this.id = {
            value: serverWorkload ? serverWorkload.DistribId : -1,
            friendlyName: "ID",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.subject = {
            value: serverWorkload ? serverWorkload.Subject : "",
            friendlyName: "Дисциплина",
            type: "text",
            sealed: true
        };
        this.profession = {
            value: serverWorkload ? serverWorkload.Profession : "",
            friendlyName: "Специальность",
            type: "text",
            sealed: true
        };
        this.semester = {
            value: serverWorkload ? serverWorkload.Semester : "",
            friendlyName: "Семестр",
            type: "text",
            sealed: true
        };
        this.activity = {
            value: serverWorkload ? serverWorkload.Activity : "",
            friendlyName: "Активность",
            type: "text",
            sealed: true
        };
        this.group = {
            value: serverWorkload ? serverWorkload.Group : "",
            friendlyName: "Группа",
            type: "text",
            sealed: true
        };
        this.subGroup = {
            value: serverWorkload ? serverWorkload.SubGroup : "",
            friendlyName: "Подгруппа",
            type: "text",
            sealed: true
        };
        this.hour = {
            value: serverWorkload ? serverWorkload.Hour : "",
            friendlyName: "Часы",
            type: "text"
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
            distribId: this.id.value(),
            hour: this.hour.value()
        };
    }
} 
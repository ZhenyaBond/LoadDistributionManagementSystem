export default class Teacher {
    constructor(serverLecturer, ko) {
        this.id = {
            value: serverLecturer ? serverLecturer.TeacherID : -1,
            friendlyName: "ID",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.name = {
            value: serverLecturer ? serverLecturer.TeacherFullName : "",
            friendlyName: "ФИО",
            type: "text"
        };
        this.position = {
            value: serverLecturer ? serverLecturer.PositionName : "",
            valueId: serverLecturer ? serverLecturer.PositionID : -1,
            friendlyName: "Должность",
            type: "select",
            data: "positions",
            gridCenter: true
        };
        this.norm = {
            value: serverLecturer ? serverLecturer.NormName : "",
            valueId: serverLecturer ? serverLecturer.NormID : -1,
            friendlyName: "Ставка",
            type: "select",
            data: "normas",
            gridCenter: true
        };
        this.degree = {
            value: serverLecturer ? serverLecturer.DegreeName : "",
            valueId: serverLecturer ? serverLecturer.DegreeID : -1,
            friendlyName: "Науч. ст.",
            type: "select",
            data: "degrees",
            gridCenter: true
        };
        this.title = {
            value: serverLecturer ? serverLecturer.TitleName : "",
            valueId: serverLecturer ? serverLecturer.TitleID : -1,
            friendlyName: "Уч. звание",
            type: "select",
            data: "titles",
            gridCenter: true
        };
        this.hour = {
            value: serverLecturer ? serverLecturer.Hour : "",
            friendlyName: "Часы",
            type: "text",
            sealed: true,
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
            teacherId: this.id.value(),
            fullName: this.name.value(),
            position: this.position.value(),
            norm: this.norm.value(),
            degree: this.degree.value(),
            title: this.title.value()
        };
    }

    updateId(newId) {
        this.id.value(newId);
    }
} 
export default class Group {
    constructor(serverGroup, ko) {
        this.Id = {
            value: serverGroup ? serverGroup.GroupID : -1,
            friendlyName: "Id",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.name = {
            value: serverGroup ? serverGroup.GroupName : "",
            friendlyName: "Имя группы",
            type: "text",
            gridCenter: true
        };
        this.professionId = {
            value: serverGroup ? serverGroup.ProfessionID : "",
            friendlyName: "Специальность",
            type: "text"
        };
        this.gradeId = {
            value: serverGroup ? serverGroup.GradeID : "",
            friendlyName: "Курс",
            type: "text"
        };
        this.amount = {
            value: serverGroup ? serverGroup.GroupAmount : "",
            friendlyName: "Кол-во в группе",
            type: "text",
            gridCenter: true
        };
        this.part = {
            value: serverGroup ? serverGroup.GroupPart : "",
            friendlyName: "Кол-во групп",
            type: "text",
            sealed: true,
            hidden: true
        };

        this.observe(ko);
    }

    observe(ko) {
        Object.keys(this).forEach(key => {
            if (this[key].value) {
                this[key].value = ko.observable(this[key].value);
                if (this[key].type === "select") {
                    this[key].valueId = ko.observable(this[key].valueId);
                }
            }
        });
    }

    getViewModel() {
        return {
            GroupID: this.Id.value(),
            GradeID: this.gradeId.value(),
            ProfessionID: this.professionId.value(),
            GroupName: this.name.value(),
            GroupAmount: this.amount.value(),
            GroupPart: this.part.value()
        };
    }
}
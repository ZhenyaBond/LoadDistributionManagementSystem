export default class NormPosition {
    constructor(serverNormPosition, ko) {
        this.id = {
            value: serverNormPosition ? serverNormPosition.NormPositionID : -1,
            friendlyName: "ID",
            type: "text",
            sealed: true,
            hidden: true
        };
        this.norm = {
            value: serverNormPosition ? serverNormPosition.NormName : "",
            friendlyName: "Норма",
            type: "text",
            sealed: true,
            gridCenter: true
        };
        this.position = {
            value: serverNormPosition ? serverNormPosition.PositionName : "",
            friendlyName: "Позиция",
            type: "text",
            sealed: true,
            gridCenter: true
        };
        this.hour = {
            value: serverNormPosition ? serverNormPosition.Hour : "",
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
            NormPositionId: this.id.value(),
            Hour: this.hour.value()
        };
    }
} 
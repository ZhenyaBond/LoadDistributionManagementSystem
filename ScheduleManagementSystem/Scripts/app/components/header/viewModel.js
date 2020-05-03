import { sendServerRequest, getToken, resetToken } from "tools/common";

import Modal from "tools/Modal";

export function ViewModel(params, ko) {
    const self = this;

    self.url = ko.observable("");
    self.plannedValue = ko.observable("");
    self.actualValue = ko.observable("");

    self.isWorkloadPage = params.isWorkloadPage;
    self.teacherId = params.teacherId;

    self.reloadCurrentValue = () => {
        let token = getToken();

        let serverUrl = self.isWorkloadPage
            ? `/api/teachers/GetActualWorkload?teacherId=${self.teacherId}`
            : "/api/server/currentvalue";

        sendServerRequest("get", serverUrl, null, token)
            .then(data => {
                self.actualValue(data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    self.logout = () => {
        $(document).trigger("showPreloader");

        resetToken();

        setTimeout(() => {
            window.location.replace("/");
        }, 2000);
    };

    const bindPlannedChange = () => {
        $("#plannedValue").click(() => {
            let $textInput = $("<input />", { type: "text", value: self.plannedValue() });

            new Modal()
                .create($textInput)
                .open();

            $textInput[0].addEventListener("okBtnPressed",
                () => {
                    let newValue = $textInput.val();

                    setVariable(newValue);
                });
        });
    };
    const getReportUrl = () => {
        let token = getToken();

        sendServerRequest("get", "/api/server/reporturl", null, token)
            .then(response => {
                response = JSON.parse(response);

                self.url(response.Url);
            });
    };
    const getVariables = () => {
        let token = getToken();

        let serverUrl = self.isWorkloadPage
            ? `/api/teachers/getvariables?teacherId=${self.teacherId}`
            : "/api/server/variables";

        sendServerRequest("get", serverUrl, null, token)
            .then(response => {
                response = JSON.parse(response);

                self.plannedValue(response.PlannedValue);
                self.actualValue(response.ActualValue);
            });
    };
    const setVariable = (newValue) => {
        let obj = {
            value: newValue
        };
        let token = getToken();

        sendServerRequest("post", "/api/server/setvariable", JSON.stringify(obj), token)
            .then(() => {
                self.plannedValue(newValue);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    !self.isWorkloadPage && bindPlannedChange();
    getReportUrl();
    getVariables();

    console.log(self.teacherId);
}   
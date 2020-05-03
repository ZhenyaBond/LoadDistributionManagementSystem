import { getToken, sendServerRequest } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import SubjectProfession from "./SubjectProfession";

export function ViewModel(ko) {
    const self = this;

    self.contextMenu = null;

    self.subjectprofessions = ko.observableArray([]);
    self.defaults = null;
    self.selectedId = null;
    self.selectedItem = null;

    self.addSubjectProfession = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel, defaults: defaults" });

        let subjectprofessionModel = new SubjectProfession(null, ko);

        let model = {
            viewModel: subjectprofessionModel,
            defaults: self.defaults
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = subjectprofessionModel.getViewModel();
                updateModel(model);

                createSubjectProfession(model, subjectprofessionModel);
            });

        ko.applyBindings(model, component[0]);
    };

    self.deleteSubjectProfession = () => {
        let confirmed = confirm("Удалить дисциплину?");

        if (confirmed) {
            deleteSubjectProfession(self.selectedId, self.selectedItem);
        }
    };
    
    self.menuHandler = (coords, data) => {
        self.selectedItem = data;
        self.selectedId = data.Id.value();

        self.contextMenu.open(coords);
    };    

    const getSubjectProfessions = () => {
        let token = getToken();

        sendServerRequest("get", "/api/subjectprofessions", null, token)
            .then((response) => {
                const serverObjects = JSON.parse(response);

                let subjectprofessions = [];
                ko.utils.arrayForEach(serverObjects,
                    (serverObject) => {
                        subjectprofessions.push(new SubjectProfession(serverObject, ko));
                    });

                self.subjectprofessions(subjectprofessions);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getDefaults = () => {
        let token = getToken();

        sendServerRequest("get", "/api/subjectprofessions/getstaticdefaults", null, token)
            .then(response => {
                self.defaults = JSON.parse(response);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const createSubjectProfession = (data, subjectprofessionModel) => {
        const token = getToken();

        sendServerRequest("post", "/api/subjectprofessions", JSON.stringify(data), token)
            .then(response => {
                const createdSubjectProfession = JSON.parse(response);

                subjectprofessionModel.updateId(createdSubjectProfession.SubjectProfessionID);
                self.subjectprofessions.push(subjectprofessionModel);
            })
            .catch(error => {
                console.log(error);
            });
    };
    

    const deleteSubjectProfession = (data, subjectprofessionModel) => {
        const token = getToken();

        sendServerRequest("get", `/api/subjectprofessions/delete?modelId=${data}`, null, token)
            .then(() => {
                self.subjectprofessions.remove(subjectprofessionModel);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateModel = (viewModel) => {
        let profession = self.defaults.professions.find(nrm => nrm.Name === viewModel.ProfessionID);
        let subject = self.defaults.subjects.find(deg => deg.Name === viewModel.SubjectID);

        viewModel.professionId = profession.Id;
        viewModel.subjectId = subject.Id;
    };

    self.contextMenu = new ContextMenu($("#table"), $("subject-professions-module"))
        .create([
            { optionName: "Удалить", clickHandler: self.deleteSubjectProfession }
        ]);

    getSubjectProfessions();
    getDefaults();
}
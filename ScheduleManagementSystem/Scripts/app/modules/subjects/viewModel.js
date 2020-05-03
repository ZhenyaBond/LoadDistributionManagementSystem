import { getToken, sendServerRequest } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import Subject from "./Subject";

export function ViewModel(ko) {
    const self = this;

    self.contextmenu = null;
    self.selectedId = null;
    self.selectedItem = null;

    self.subjects = ko.observableArray([]);

    self.loadFromWeb = () => {
        let token = getToken();

        sendServerRequest("get", "/api/subjects/loadfromweb", null, token)
            .catch(error => {
                console.log(error);
            });
    };
    self.addSubject = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel" });

        let subjectModel = new Subject(null, ko);

        let model = {
            viewModel: subjectModel
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = subjectModel.getViewModel();
                createThings(model, subjectModel);
            });

        ko.applyBindings(model, component[0]);
    };
    self.updateSubject = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel" });

        let model = {
            viewModel: self.selectedItem
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = self.selectedItem.getViewModel();

                updateLecturer(model);
            });

        ko.applyBindings(model, component[0]);
    };
    self.deleteSubject = () => {
        let confirmed = confirm("Do you want to delete this activity?");

        if (confirmed) {
            deleteSubject(self.selectedId, self.selectedItem);
        }
    };

    self.menuHandler = (coords, data) => {
        self.selectedItem = data;
        self.selectedId = data.id.value();

        self.contextMenu.open(coords);
    }; 

    const getSubjects = () => {
        let token = getToken();

        sendServerRequest("get", "/api/subjects", null, token)
            .then((response) => {
                const serverSubjects = JSON.parse(response);

                let subjects = [];
                ko.utils.arrayForEach(serverSubjects,
                    (subject) => {
                        subjects.push(new Subject(subject, ko));
                    });

                self.subjects(subjects);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteSubject = (data, subjectModel) => {
        const token = getToken();

        sendServerRequest("get", `/api/subjects/delete?modelId=${data}`, null, token)
            .then(() => {
                self.subjects.remove(subjectModel);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const createThings = (data, subjectModel) => {
        const token = getToken();

        sendServerRequest("post", "/api/subjects", JSON.stringify(data), token)
            .then(() => {
                self.subjects.push(subjectModel);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const updateLecturer = (data) => {
        const token = getToken();

        sendServerRequest("post", "/api/subjects/update", JSON.stringify(data), token)
            .catch(error => {
                console.log(error);
            });
    };

    self.contextMenu = new ContextMenu($("#table"), $("subjects-module"))
        .create([
            { optionName: "Изменить", clickHandler: self.updateSubject },
            { optionName: "Удалить", clickHandler: self.deleteSubject }
        ]);

    getSubjects();
}
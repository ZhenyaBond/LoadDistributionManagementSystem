import { getToken, sendServerRequest } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import SubjectActivity from "./SubjectActivity";

export function ViewModel(ko) {
    const self = this;

    self.contextMenu = null;

    self.subjectactivities = ko.observableArray([]);
    self.defaults = null;
    self.selectedId = null;
    self.selectedItem = null;

    self.addSubjectActivity = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel, defaults: defaults" });

        let subjectactivityModel = new SubjectActivity(null, ko);

        let model = {
            viewModel: subjectactivityModel,
            defaults: self.defaults
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = subjectactivityModel.getViewModel();
                updateModel(model);

                createSubjectActivity(model, subjectactivityModel);
            });

        ko.applyBindings(model, component[0]);
    };
    self.updateSubjectActivity = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel, defaults: defaults" });

        let model = {
            viewModel: self.selectedItem,
            defaults: self.defaults
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = self.selectedItem.getViewModel();
                updateModel(model);

                updateSubjectActivity(model, self.selectedItem);
            });

        ko.applyBindings(model, component[0]);
    };
    self.deleteSubjectActivity = () => {
        let confirmed = confirm("Удалить активность?");

        if (confirmed) {
            deleteSubjectActivity(self.selectedId, self.selectedItem);
        }
    };
    
    self.menuHandler = (coords, data) => {
        self.selectedItem = data;
        self.selectedId = data.id.value();

        self.contextMenu.open(coords);
    };    

    const getSubjectActivities = () => {
        let token = getToken();

        sendServerRequest("get", "/api/subjectactivities", null, token)
            .then((response) => {
                const serverSubjectActivities = JSON.parse(response);

                let subjectactivities = [];
                ko.utils.arrayForEach(serverSubjectActivities,
                    (subjectactivity) => {
                        subjectactivities.push(new SubjectActivity(subjectactivity, ko));
                    });

                self.subjectactivities(subjectactivities);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getDefaults = () => {
        let token = getToken();

        sendServerRequest("get", "/api/subjectactivities/GetStaticDefaults", null, token)
            .then(response => {
                self.defaults = JSON.parse(response);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const createSubjectActivity = (data, subjectactivityModel) => {
        const token = getToken();

        sendServerRequest("post", "/api/subjectactivities", JSON.stringify(data), token)
            .then(response => {
                const createdSubjectActivity = JSON.parse(response);

                subjectactivityModel.updateId(createdSubjectActivity.SubjActID);
                self.subjectactivities.push(subjectactivityModel);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const updateSubjectActivity = (data, subjectactivityModel) => {
        const token = getToken();

        sendServerRequest("post", "/api/subjectactivities/update", JSON.stringify(data), token)
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            });
    };
    const deleteSubjectActivity = (data, subjectActivityModel) => {
        const token = getToken();

        sendServerRequest("get", `/api/subjectactivities/delete?modelId=${data}`, null, token)
            .then(response => {
                self.subjectactivities.remove(subjectActivityModel);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateModel = (viewModel) => {
        let subject = self.defaults.subjects.find(pos => pos.Name === viewModel.SubjectID);
        let activity = self.defaults.activities.find(nrm => nrm.Name === viewModel.ActivityID);
        let semester = self.defaults.semesters.find(deg => deg.Name === viewModel.SemesterID);
        let profession = self.defaults.professions.find(ttl => ttl.Name === viewModel.ProfessionID);

        viewModel.subjectId = subject.Id;
        viewModel.activityId = activity.Id;
        viewModel.semesterId = semester ? semester.Id : null;
        viewModel.professionId = profession.Id;
    };

    self.contextMenu = new ContextMenu($("#table"), $("subject-activity-module"))
        .create([
            { optionName: "Изменить", clickHandler: self.updateSubjectActivity },
            { optionName: "Удалить", clickHandler: self.deleteSubjectActivity }
        ]);

    getSubjectActivities();
    getDefaults();
}
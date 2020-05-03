import { getToken, sendServerRequest } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import Teacher from "./Teacher";

export function ViewModel(ko) {
    const self = this;

    self.contextMenu = null;

    self.lecturers = ko.observableArray([]);
    self.defaults = null;
    self.selectedId = null;
    self.selectedItem = null;

    self.createHistory = () => {
        let token = getToken();

        $(document).trigger("showPreloader");

        sendServerRequest("get", "/api/teachers/createhistory", null, token)
            .then(() => {
                $(document).trigger("hidePreloader");
            })
            .catch(error => {
                $(document).trigger("showErrorCatcher", ["Произошла ошибка во время выполнения запроса"]);
            });
    };
    self.addTeacher = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel, defaults: defaults" });

        let teacherModel = new Teacher(null, ko);

        let model = {
            viewModel: teacherModel,
            defaults: self.defaults
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = teacherModel.getViewModel();
                updateModel(model);

                createLecturer(model, teacherModel);
            });

        ko.applyBindings(model, component[0]);
    };
    self.updateTeacher = () => {
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

                updateLecturer(model);
            });

        ko.applyBindings(model, component[0]);
    };
    self.deleteTeacher = () => {
        let confirmed = confirm("Удалить преподавателя?");

        if (confirmed) {
            deleteTeacher(self.selectedId, self.selectedItem);
        }
    };

    self.manageWorkload = () => history.pushState("Workload", null, `/workload/#${self.selectedId}`);
    self.menuHandler = (coords, data) => {
        self.selectedItem =  data;
        self.selectedId = data.id.value();

        self.contextMenu.open(coords);
    };    

    const getLecturers = () => {
        let token = getToken();

        $(document).trigger("showPreloader");

        sendServerRequest("get", "/api/teachers", null, token)
            .then((response) => {
                const serverLecturers = JSON.parse(response);

                let lecturers = [];
                ko.utils.arrayForEach(serverLecturers,
                    (teacher) => {
                        lecturers.push(new Teacher(teacher, ko));
                    });

                self.lecturers(lecturers);

                $(document).trigger("hidePreloader");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getDefaults = () => {
        let token = getToken();

        sendServerRequest("get", "/api/teachers/getstaticdefaults", null, token)
            .then(response => {
                self.defaults = JSON.parse(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const createLecturer = (data, teacherModel) => {
        const token = getToken();

        $(document).trigger("showPreloader");

        sendServerRequest("post", "/api/teachers", JSON.stringify(data), token)
            .then(response => {
                const createdLecturer = JSON.parse(response);

                teacherModel.updateId(createdLecturer.TeacherID);
                self.lecturers.push(teacherModel);

                $(document).trigger("hidePreloader");
            })
            .catch(error => {
                console.log(error);
            });
    };
    const updateLecturer = (data) => {
        const token = getToken();

        sendServerRequest("post", "/api/teachers/update", JSON.stringify(data), token)
            .catch(error => {
                console.log(error);
            });
    };
    const deleteTeacher = (data, teacherModel) => {
        const token = getToken();

        sendServerRequest("get", `/api/teachers/delete?modelId=${data}`, null, token)
            .then(() => {
                self.lecturers.remove(teacherModel);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateModel = (viewModel) => {
        let position = self.defaults.positions.find(pos => pos.Name === viewModel.position);
        let norm = self.defaults.normas.find(nrm => nrm.Name === viewModel.norm);
        let degree = self.defaults.degrees.find(deg => deg.Name === viewModel.degree);
        let title = self.defaults.titles.find(ttl => ttl.Name === viewModel.title);

        viewModel.positionId = position.Id;
        viewModel.normaId = norm.Id;
        viewModel.degreeId = degree ? degree.Id : null;
        viewModel.titleId = title ? title.Id : null;
    };

    self.contextMenu = new ContextMenu($("#table"), $("teachers-module"))
        .create([
            { optionName: "Нагрузка", clickHandler: self.manageWorkload },
            { optionName: "Изменить", clickHandler: self.updateTeacher },
            { optionName: "Удалить", clickHandler: self.deleteTeacher }
        ]);

    getLecturers();
    getDefaults();
}
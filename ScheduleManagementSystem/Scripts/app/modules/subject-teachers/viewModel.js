import { getToken, sendServerRequest } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import SubjectTeacher from "./SubjectTeacher";

export function ViewModel(ko) {
    const self = this;

    self.contextMenu = null;

    self.subjectteachers = ko.observableArray([]);
    self.defaults = null;
    self.selectedId = null;
    self.selectedItem = null;

    self.addSubjectTeacher = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel, defaults: defaults" });

        let subjectteacherModel = new SubjectTeacher(null, ko);

        let model = {
            viewModel: subjectteacherModel,
            defaults: self.defaults
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = subjectteacherModel.getViewModel();
                updateModel(model);

                createSubjectTeacher(model, subjectteacherModel);
            });

        ko.applyBindings(model, component[0]);
    };

    self.deleteSubjectTeacher = () => {
        let confirmed = confirm("Удалить лектора?");

        if (confirmed) {
            deleteSubjectTeacher(self.selectedId, self.selectedItem);
        }
    };
    
    self.menuHandler = (coords, data) => {
        self.selectedItem = data;
        self.selectedId = data.Id.value();

        self.contextMenu.open(coords);
    };    

    const getSubjectTeachers = () => {
        let token = getToken();

        sendServerRequest("get", "/api/subjectteachers", null, token)
            .then((response) => {
                const serverSubjectTeacher = JSON.parse(response);

                let subjectteachers = [];
                ko.utils.arrayForEach(serverSubjectTeacher,
                    (subjectteacher) => {
                        subjectteachers.push(new SubjectTeacher(subjectteacher, ko));
                    });

                self.subjectteachers(subjectteachers);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getDefaults = () => {
        let token = getToken();

        sendServerRequest("get", "/api/subjectteachers/getstaticdefaults", null, token)
            .then(response => {
                self.defaults = JSON.parse(response);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const createSubjectTeacher = (data, subjectteacherModel) => {
        const token = getToken();

        sendServerRequest("post", "/api/subjectteachers", JSON.stringify(data), token)
            .then(response => {
                const createdSubjectTeacher = JSON.parse(response);

                subjectteacherModel.updateId(createdSubjectTeacher.SubjectTeacherID);
                self.subjectteachers.push(subjectteacherModel);
            })
            .catch(error => {
                console.log(error);
            });
    };
    

    const deleteSubjectTeacher = (data, subjectteacherModel) => {
        const token = getToken();

        sendServerRequest("get", `/api/subjectteachers/delete?modelId=${data}`, null, token)
            .then(response => {
                self.subjectteachers.remove(subjectteacherModel);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateModel = (viewModel) => {
        let teacher = self.defaults.teachers.find(nrm => nrm.Name === viewModel.TeacherID);
        let subject = self.defaults.subjects.find(deg => deg.Name === viewModel.SubjectID);
        let stream = self.defaults.streams.find(ttl => ttl.Name === viewModel.StreamID);

        viewModel.teacherId = teacher.Id;
        viewModel.subjectId = subject.Id;
        viewModel.streamId = stream.Id;
    };

    self.contextMenu = new ContextMenu($("#table"), $("subjects-teachers-module"))
        .create([
            { optionName: "Удалить", clickHandler: self.deleteSubjectTeacher }
        ]);

    getSubjectTeachers();
    getDefaults();
}
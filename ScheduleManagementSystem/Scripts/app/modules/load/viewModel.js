import { sendServerRequest, getToken } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import Workload from "./Workload";


export function ViewModel(ko) {
    const self = this;

    const getObjectModel = (array, idProperty, labelProperty) => {
        const result = [];
        const map = new Map();

        for (const item of array) {
            if (!map.has(item[idProperty])) {
                map.set(item[idProperty], true);

                result.push({
                    Id: item[idProperty],
                    Name: item[labelProperty]
                });
            }
        }

        return result;
    };

    self.contextMenu = null;

    self.workLoadData = ko.observableArray([]);
    self.teacherName = ko.observable("");
    self.teacherId = null;
    self.selectedId = null;
    self.selectedItem = null;

    const loadingFlags = [];

    self.currentTeacherWorkloadData = ko.observableArray([]);

    self.menuHandler = (coords, data) => {
        self.selectedItem = data;
        self.selectedId = data.id.value();

        self.contextMenu.open(coords);
    };
    self.updateWorkload = () => {
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

                updateWorkload(model);
            });

        ko.applyBindings(model, component[0]);
    };
    self.deleteWorkload = () => {
        let confirmed = confirm("Удалить нагрузку?");

        if (confirmed) {
            deleteWorkload(self.selectedId, self.selectedItem);
        }
    };

    self.subjects = ko.computed(() => {
        let subjects = getObjectModel(self.workLoadData(), "SubjectID", "SubjectFullName");

        return subjects;
    });
    self.selectedSubjectId = ko.observable();

    self.semesters = ko.computed(() => {
        let selectedSubjectId = self.selectedSubjectId();

        const filteredWorkload = self.workLoadData().filter(wld => wld.SubjectID === selectedSubjectId);
        const semesters = getObjectModel(filteredWorkload, "SemecterID", "SemesterNameRu");

        return semesters;
    });
    self.selectedSemesterId = ko.observable();

    self.specs = ko.computed(() => {
        let selectedSubjectId = self.selectedSubjectId();
        let selectedSemesterId = self.selectedSemesterId();

        const filteredWorkload = self.workLoadData()
            .filter(wld => wld.SubjectID === selectedSubjectId && wld.SemecterID === selectedSemesterId);
        const specs = getObjectModel(filteredWorkload, "ProfessionId", "ProfessionName");

        return specs;
    });
    self.selectedSpecId = ko.observable();

    self.activities = ko.computed(() => {
        let selectedSubjectId = self.selectedSubjectId();
        let selectedSemesterId = self.selectedSemesterId();
        let selectedSpecId = self.selectedSpecId();

        const filteredWorkload = self.workLoadData().filter(wld => wld.SubjectID === selectedSubjectId &&
            wld.SemecterID === selectedSemesterId &&
            wld.ProfessionId === selectedSpecId);

        const activities = getObjectModel(filteredWorkload, "ActivityID", "ActivityNameRu");

        return activities;
    });
    self.selectedActivityId = ko.observable();

    self.groups = ko.computed(() => {
        let selectedSubjectId = self.selectedSubjectId();
        let selectedSemesterId = self.selectedSemesterId();
        let selectedSpecId = self.selectedSpecId();
        let selectedActivityId = self.selectedActivityId();

        const filteredWorkload = self.workLoadData().filter(wld => wld.SubjectID === selectedSubjectId &&
            wld.SemecterID === selectedSemesterId &&
            wld.ProfessionId === selectedSpecId &&
            wld.ActivityID === selectedActivityId);

        const groups = getObjectModel(filteredWorkload, "GroupID", "GroupName");

        return groups;
    });
    self.selectedGroupId = ko.observable();

    self.subGroups = ko.computed(() => {
        let selectedSubjectId = self.selectedSubjectId();
        let selectedSemesterId = self.selectedSemesterId();
        let selectedSpecId = self.selectedSpecId();
        let selectedActivityId = self.selectedActivityId();
        let selectedGroupId = self.selectedGroupId();

        const filteredWorkload = self.workLoadData().filter(wld => wld.SubjectID === selectedSubjectId &&
            wld.SemecterID === selectedSemesterId &&
            wld.ProfessionId === selectedSpecId &&
            wld.ActivityID === selectedActivityId &&
            wld.GroupID === selectedGroupId);

        const subGroups = getObjectModel(filteredWorkload, "SubGroupId", "SubGroupName");

        return subGroups;
    });
    self.selectedSubGroupId = ko.observable();

    self.hours = ko.computed(() => {
        let selectedSubjectId = self.selectedSubjectId();
        let selectedSemesterId = self.selectedSemesterId();
        let selectedSpecId = self.selectedSpecId();
        let selectedActivityId = self.selectedActivityId();

        let filteredWorkload = self.workLoadData().filter(wld => wld.SubjectID === selectedSubjectId &&
            wld.SemecterID === selectedSemesterId &&
            wld.ProfessionId === selectedSpecId &&
            wld.ActivityID === selectedActivityId);

        let propertyName;
        let selectedActivity = filteredWorkload.length > 0
            ? filteredWorkload.find(fwld => fwld.ActivityID === selectedActivityId).ActivityNameRu
            : "";

        if (!["Лекции", "Консультации"].includes(selectedActivity)) {
            let selectedGroupId = self.selectedGroupId();
            let selectedSubGroupId = self.selectedSubGroupId();

            filteredWorkload =
                filteredWorkload.filter(wld => wld.GroupID === selectedGroupId &&
                    wld.SubGroupId === selectedSubGroupId);
        }

        switch (selectedActivity) {
            case "Лекции":
                propertyName = "Hour";
                break;
            case "Экзамен":
                propertyName = "ExamTotalHour";
                break;
            case "Лабораторные занятия":
                propertyName = "LabHourTotal";
                break;
            case "Консультации":
                propertyName = "ConsultTotalHour";
                break;
            case "Зачет":
                propertyName = "CreditTotalHour";
                break;
            case "Практические занятия":
                propertyName = "PractHourTotal";
                break;
            case "Курсовая работа":
                propertyName = "CourseworkTotalHour";
                break;
            default:
                return [];
        }

        console.log(`Hour prop name ${propertyName}`);

        const hours = [...new Set(filteredWorkload.map(wld => wld[propertyName]))];

        return hours;
    });
    self.selectedHour = ko.observable();

    self.assignWorkload = () => {
        let obj = {
            subjectId: self.selectedSubjectId(),
            semesterId: self.selectedSemesterId(),
            specId: self.selectedSpecId(),
            activityId: self.selectedActivityId(),
            groupId: self.selectedGroupId(),
            subGroupId: self.selectedSubGroupId(),
            hour: self.selectedHour(),
            teacherId: self.teacherId
        };

        console.log(obj);

        let token = getToken();

        sendServerRequest("post", "/api/load", JSON.stringify(obj), token)
            .then((response) => {
                //response = JSON.parse(response);

                //self.currentTeacherWorkloadData.push(new Workload(response, ko));

                getTeacherWorkloadData();
            })
            .catch(error => {
                $(document).trigger("showErrorCatcher", ["Данная операция невозможна"]);
            });
    };

    const getWorkloadData = () => {
        let token = getToken();

        sendServerRequest("get", "/api/load", null, token)
            .then((response) => {
                response = JSON.parse(response);

                self.workLoadData(response);

                if (loadingFlags.length === 1) {
                    $(document).trigger("hidePreloader");
                } else {
                    loadingFlags.push(true);
                }

                manageInputs(false);
            });
    };
    const extractTeacherId = () => {
        let token = getToken();

        let hash = window.location.hash.substring(1);
        self.teacherId = parseInt(hash);

        sendServerRequest("get", `/api/teachers/getteachername?id=${hash}`, null, token)
            .then(response => {
                let teacherName = response.substring(1, response.length - 1);
                self.teacherName(teacherName);
            })
            .catch(error => {
                console.log(error);
            });

        getTeacherWorkloadData();
    };

    const manageInputs = (value) => {
        $("#assignWorkload").find("*").prop("disabled", value);
    };
    
    const getTeacherWorkloadData = () => {
        let token = getToken();

        sendServerRequest("get", `/api/load/teacherworkload?teacherId=${self.teacherId}`, null, token)
            .then(response => {
                let workload = [];

                response = JSON.parse(response);

                ko.utils.arrayForEach(response,
                    (load) => {
                        workload.push(new Workload(load, ko));
                    });

                self.currentTeacherWorkloadData(workload);

                if (loadingFlags.length === 1) {
                    $(document).trigger("hidePreloader");
                } else {
                    loadingFlags.push(true);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const updateWorkload = (model) => {
        const token = getToken();

        sendServerRequest("post", "/api/load/update", JSON.stringify(model), token)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                $(document).trigger("showErrorCatcher", ["Ошибка при выполнении запроса. Обратитесь к администратору."]);
            });
    };
    const deleteWorkload = (id, model) => {
        const token = getToken();

        sendServerRequest("get", `/api/load/delete?modelId=${id}`, null, token)
            .then(response => {
                self.currentTeacherWorkloadData.remove(model);
            })
            .catch(error => {
                $(document).trigger("showErrorCatcher", ["Ошибка при выполнении запроса. Обратитесь к администратору."]);
            });
    };

    self.contextMenu = new ContextMenu($("#table"), $("load-module"))
        .create([
            { optionName: "Изменить", clickHandler: self.updateWorkload },
            { optionName: "Удалить", clickHandler: self.deleteWorkload }
        ]);

    $(document).trigger("showPreloader");

    manageInputs(true);
    extractTeacherId();
    getWorkloadData();
}
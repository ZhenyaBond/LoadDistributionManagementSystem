import { getToken, sendServerRequest } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import Group from "./Group";

export function ViewModel(ko) {
    const self = this;

    self.contextMenu = null;

    self.groups = ko.observableArray([]);
    self.selectedItem = null;
    self.selectedGroupItemId = null;
    self.selectedSubGroupItemId = null;

    self.menuHandler = (coords, data) => {
        self.selectedItem = data;
        self.selectedGroupItemId = data.GroupId.value();
        self.selectedSubGroupItemId = data.SubGroupId.value();

        self.contextMenu.open(coords);
    };

    self.addGroup = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel" });

        let groupModel = new Group(null, ko);

        let model = {
            viewModel: groupModel
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = groupModel.getViewModel();
                createGroups(model, groupModel);
            });

        ko.applyBindings(model, component[0]);
    };

    self.removeSubGroup = () => {
        let confirmed = confirm("Удалить подгруппу?");

        if (confirmed) {
            deleteSubGroup(self.selectedSubGroupItemId, self.selectedItem);
        }
    };
    self.removeGroup = () => {
        let confirmed = confirm("Удалить группу?");

        if (confirmed) {
            deleteGroup(self.selectedGroupItemId);
        }
    };

    const createGroups = (data, groupModel) => {
        const token = getToken();

        sendServerRequest("post", "/api/groups", JSON.stringify(data), token)
            .then(() => {
                self.groups.push(groupModel);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const deleteSubGroup = (subGroupId, item) => {
        const token = getToken();

        sendServerRequest("get", `/api/groups/deletesubgroup?subGroupId=${subGroupId}`, null, token)
            .then(() => {
                self.groups.remove(item);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const deleteGroup = (groupId) => {
        const token = getToken();

        sendServerRequest("get", `/api/groups/deletegroup?groupId=${groupId}`, null, token)
            .then(() => {
                self.groups.remove(g => g.GroupId.value() === groupId);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getGroups = () => {
        let token = getToken();

        sendServerRequest("get", "/api/groups", null, token)
            .then((response) => {
                const serverGroups = JSON.parse(response);

                let groups = [];
                ko.utils.arrayForEach(serverGroups,
                    (serverGroup) => {
                        groups.push(new Group(serverGroup, ko));
                    });

                self.groups(groups);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    self.contextMenu = new ContextMenu($("#table"), $("groups-module"))
        .create([
            { optionName: "Удалить подгруппу", clickHandler: self.removeSubGroup },
            { optionName: "Удалить группу", clickHandler: self.removeGroup  }
        ]);

    getGroups();
}
import { getToken, sendServerRequest } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import NormPosition from "./NormPosition";

export function ViewModel(ko) {
    const self = this;

    self.contextMenu = null;

    self.normpositions = ko.observableArray([]);

    self.menuHandler = (coords, data) => {
        self.selectedItem = data;
        self.selectedId = data.id.value();

        self.contextMenu.open(coords);
    };

    self.updateNormPosition = () => {
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

                updateNormPosition(model);
            });

        ko.applyBindings(model, component[0]);
    };
    

    const getNormPositions = () => {
        let token = getToken();

        sendServerRequest("get", "/api/normpositions", null, token)
            .then((response) => {
                const serverNormPositions = JSON.parse(response);

                let normpositions = [];
                ko.utils.arrayForEach(serverNormPositions,
                    (normposition) => {
                        normpositions.push(new NormPosition(normposition, ko));
                    });

                self.normpositions(normpositions);
            })
            .catch((error) => {
                console.log(error);
            });
    };
   
    const updateNormPosition = (data) => {
        const token = getToken();

        sendServerRequest("post", "/api/normpositions/update", JSON.stringify(data), token)
            .catch(error => {
                console.log(error);
            });
    };

    self.contextMenu = new ContextMenu($("#table"), $("normas-module"))
        .create([
            { optionName: "Изменить", clickHandler: self.updateNormPosition }
        ]);

    

    getNormPositions();

}
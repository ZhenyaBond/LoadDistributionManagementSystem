import { getToken, sendServerRequest } from "tools/common";

import Modal from "tools/Modal";
import ContextMenu from "tools/ContextMenu";

import Stream from "./Stream";

export function ViewModel(ko) {
    const self = this;

    self.contextMenu = null;

    self.streams = ko.observableArray([]);
    self.defaults = null;
    self.selectedId = null;
    self.selectedItem = null;

    self.addStream = () => {
        let component = $("<entity-manager />", { params: "viewModel: viewModel, defaults: defaults" });

        let streamModel = new Stream(null, ko);

        let model = {
            viewModel: streamModel,
            defaults: self.defaults
        };

        new Modal()
            .create(component)
            .open();

        component[0].addEventListener("okBtnPressed",
            () => {
                let model = streamModel.getViewModel();
                updateModel(model);

                createStream(model, streamModel);
            });

        ko.applyBindings(model, component[0]);
    };
    self.deleteStream = () => {
        let confirmed = confirm("Удалить поток?");

        if (confirmed) {
            deleteStream(self.selectedId, self.selectedItem);
        }
    };
    
    self.menuHandler = (coords, data) => {
        self.selectedItem =  data;
        self.selectedId = data.Id.value();

        self.contextMenu.open(coords);
    };    

    const getStreams = () => {
        let token = getToken();

        sendServerRequest("get", "/api/streams", null, token)
            .then((response) => {
                const serverStreams = JSON.parse(response);

                let streams = [];
                ko.utils.arrayForEach(serverStreams,
                    (stream) => {
                        streams.push(new Stream(stream, ko));
                    });

                self.streams(streams);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getDefaults = () => {
        let token = getToken();

        sendServerRequest("get", "/api/streams/getstaticdefaults", null, token)
            .then(response => {
                self.defaults = JSON.parse(response);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const createStream = (data, streamModel) => {
        const token = getToken();

        sendServerRequest("post", "/api/streams", JSON.stringify(data), token)
            .then(response => {
                const createdStream = JSON.parse(response);

                streamModel.updateId(createdStream.ID);
                self.streams.push(streamModel);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const deleteStream = (data, streamModel) => {
        const token = getToken();

        sendServerRequest("get", `/api/streams/delete?modelId=${data}`, null, token)
            .then(() => {
                self.streams.remove(streamModel);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const updateModel = (viewModel) => {
        let profession = self.defaults.professions.find(nrm => nrm.Name === viewModel.ProfessionName);
        let subject = self.defaults.subjects.find(deg => deg.Name === viewModel.StreamSubject);
        let semester = self.defaults.semesters.find(ttl => ttl.Name === viewModel.SemesterID);

        viewModel.professionId = profession.Id;
        viewModel.subjectId = subject.Id;
        viewModel.semesterId = semester.Id;
    };

    self.contextMenu = new ContextMenu($("#table"), $("streams-module"))
        .create([
            { optionName: "Удалить", clickHandler: self.deleteStream }
        ]);

    getStreams();
    getDefaults();
}
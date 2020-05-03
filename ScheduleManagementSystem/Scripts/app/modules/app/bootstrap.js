import template from "./layout.html";

export default function (ko) {
    ko.components.register("app-module",
        {
            template: template,
            viewModel: null,
            synchronous: true
        });
}
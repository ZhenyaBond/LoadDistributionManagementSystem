import template from "./layout.html";

export default function (ko) {
    ko.components.register("not-found-module",
        {
            template: template,
            viewModel: null
        });
}
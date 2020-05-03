import template from "./layout.html";
import { ViewModel } from "./viewModel";

export default function (ko) {
    ko.components.register("error-module",
        {
            template: template,
            viewModel: { createViewModel: (params) => new ViewModel(params, ko) }
        });
}
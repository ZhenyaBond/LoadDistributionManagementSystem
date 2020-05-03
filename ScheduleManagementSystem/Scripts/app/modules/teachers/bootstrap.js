import template from "./layout.html";
import { ViewModel } from "./viewModel";

export default function (ko) {
    ko.components.register("teachers-module",
        {
            template: template,
            viewModel: { createViewModel: () => new ViewModel(ko) }
        });
}
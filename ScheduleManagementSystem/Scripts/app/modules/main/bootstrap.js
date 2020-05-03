import template from "./layout.html";
import { ViewModel } from "./viewModel";

export default function (ko) {
    ko.components.register("main-module",
        {
            template: template,
            viewModel: { createViewModel: () => new ViewModel(ko) }
        });
}
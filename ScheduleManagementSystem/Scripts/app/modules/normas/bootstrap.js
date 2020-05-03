import template from "./layout.html";
import { ViewModel } from "./viewModel";

export default function (ko) {
    ko.components.register("normas-module",
        {
            template: template,
            viewModel: { createViewModel: () => new ViewModel(ko) }
        });
}
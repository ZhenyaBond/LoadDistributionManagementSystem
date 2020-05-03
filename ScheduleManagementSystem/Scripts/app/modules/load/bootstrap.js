import template from "./load.html";
import { ViewModel } from "./viewModel";

export default function (ko) {
    ko.components.register("load-module",
        {
            template: template,
            viewModel: { createViewModel: () => new ViewModel(ko) }
        });
}
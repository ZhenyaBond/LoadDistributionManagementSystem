import ko from 'knockout';

import { bindErrorHandler, Preloader } from "./tools/common";
import Router from "./tools/Router";
import Catcher from "./tools/Catcher";

import registerCommonModules from "./common/bootstrap";
import registerComponentsModules from "./components/bootstrap";
import registerGlobalModules from "./modules/bootstrap";

function registerComponents() {
    registerCommonModules(ko);
    registerComponentsModules(ko);
    registerGlobalModules(ko);

    ko.applyBindings();
}

function modifyPushState() {
    const pushState = history.pushState;

    history.pushState = function() {
        pushState.apply(history, arguments);

        window.dispatchEvent(new Event("pushState"));
    };
}

$(document).ready(function () {
    registerComponents();
    modifyPushState();

    bindErrorHandler();

    new Preloader();
    new Catcher();
    new Router(ko)
        .register([
            {
                url: "/",
                component: "main",
                title: "Главная"
            },
            {
                url: "/login",
                component: "login",
                title: "Вход в систему"
            },
            {
                url: "/teachers",
                component: "teachers",
                title: "Преподаватели"
            },
            {
                url: "/groups",
                component: "groups",
                title: "Группы"
            },
            {
                url: "/disciplines",
                component: "subjects",
                title: "Дисциплины"
            },
            {
                url: "/normas",
                component: "normas",
                title: "Нормы"
            },
            {
                url: "/streams",
                component: "streams",
                title: "Потоки"
            },
            {
                url: "/subjects-teachers",
                component: "subjects-teachers",
                title: "Дисциплины-Преподаватели"
            },
            {
                url: "/subjects-activities",
                component: "subject-activity",
                title: "Дисциплины-Активности"
            },
            {
                url: "/subjects-professions",
                component: "subject-professions",
                title: "Дисциплины-Профессии"
            },
            {
                url: "/workload",
                component: "load",
                title: "Нагрузка"
            }
        ])
        .handleFirstRequest();
});
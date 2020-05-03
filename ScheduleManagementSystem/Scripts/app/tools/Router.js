export default class Router {
    constructor(ko) {
        this.ko = ko;

        this.$rootApp = $("app-module");
        this.routes = null;

        this.attachEventListener();
    }

    attachEventListener() {
        window.addEventListener("pushState",
            (event) => {
                let path = event.currentTarget.location.pathname;

                this.render(path);
            });
    }

    clearRoot() {
        this.$rootApp.empty();
    }

    getErrorRoute() {
        return {
            url: window.location.pathname,
            component: "not-found",
            title: "404 - Resource not found"
        };
    };

    render(path) {
        $(document).trigger("showPreloader");

        this.clearRoot();

        path.length > 1 &&
            path.slice(-1) === "/" &&
            (() => {
                path = path.substring(0, path.length - 1);
            })();

        let route = this.routes.find(r => r.url.toLowerCase() === path.toLowerCase());

        if (!route) {
            route = this.getErrorRoute();
        }

        document.title = route.title;

        let fullName = `${route.component}-module`;
        let $component = $(`<${fullName} />`);

        this.$rootApp.append($component);
        this.ko.applyBindings(null, $component[0]);

        $(document).trigger("hidePreloader");
    }

    register(routes) {
        this.routes = routes;

        return this;
    }

    handleFirstRequest() {
        this.render(window.location.pathname);

        return this;
    }
}
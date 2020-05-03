export default class Catcher {
    constructor() {
        this.startEvent = new Event("showErrorCatcher");

        this.initCatcher();
    }

    createCatcher(errorMessage) {
        let $catcher = $("<div />", { class: "error-catcher" });

        let $header = $("<div />", { text: "Произошла ошибка." });
        let $message = $("<div />", { text: `Сообщение: ${errorMessage}`});

        $catcher.append($header);
        $catcher.append($message);

        $('body').append($catcher);

        setTimeout(this.hideCatcher, 5000);
    }

    hideCatcher() {
        let $catcher = $('body').find(".error-catcher");

        $catcher.remove();
    }

    initCatcher() {
        $(document).on("showErrorCatcher",
            (_, errorMessage) => {
                this.createCatcher(errorMessage);
            });
    }
}
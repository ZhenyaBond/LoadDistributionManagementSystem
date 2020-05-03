function centerModal($modal) {
    let top = $(window).height() / 2;
    let left = $(window).width() / 2;

    $modal.css({
        top: top,
        left: left,
        transform: "translate(-50%, -50%)"
    });
}

export default class Modal {
    constructor() {
        this.$overlay = null;
        this.$modal = null;
        this.$content = null;
    }

    create = (body) => {
        let $overlay = $("<div />", { class: "popup-overlay" });
        let $modalContainer = $("<div />", { class: "popup-container" });

        let $btnContainer = $("<div />", { class: "popup-btn-container" });
        let $cancelButton = $("<div />", { text: "Отменить", class: "popup-cancel-btn" });
        let $okButton = $("<div />", { text: "Применить", class: "popup-ok-btn" });

        $cancelButton.click(this.cancelBtnHandler);
        $okButton.click(this.okBtnHandler);

        $btnContainer.append($cancelButton);
        $btnContainer.append($okButton);

        $modalContainer.append(body);
        $modalContainer.append($btnContainer);

        this.$overlay = $overlay;
        this.$content = body;
        this.$modal = $modalContainer;

        centerModal($modalContainer);

        return this;
    }

    open = () => {
        $('body').append(this.$overlay, this.$modal);
    }

    okBtnHandler = () => {
        let event = new Event("okBtnPressed");

        this.$content[0].dispatchEvent(event);

        this.cancelBtnHandler();
    }

    cancelBtnHandler = () => {
        this.$modal.remove();
        this.$overlay.remove();
    }
}
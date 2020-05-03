export default class ContextMenu {
    constructor($area, $root) {
        this.$area = $area;
        this.$root = $root;

        this.$menu = null;

        this.isMenuVisible = false;
    }

    create = (items) => {
        let $menuContainer = $("<div />", { class: "menu" });
        let $optionsContainer = $("<ul />", { class: "menu-options" });

        items.forEach(item => {
            let $option = $("<li />", { class: "menu-option", text: item.optionName });
            $option.click(item.clickHandler);

            $optionsContainer.append($option);
        });

        $menuContainer.append($optionsContainer);

        this.$root.append($menuContainer);

        this.$menu = $menuContainer;

        this.setupCloseHandler();

        return this;
    }

    setupCloseHandler = () => {
        $(document).click(() => {
            if (this.isMenuVisible) {
                this.close();
            }
        });
    }

    open = (coords) => {
        this.$menu.css("left", `${coords.x}px`);
        this.$menu.css("top", `${coords.y}px`);

        this.$menu.css("display", "block");

        this.isMenuVisible = !this.isMenuVisible;
    }

    close = () => {
        this.isMenuVisible = !this.isMenuVisible;
        this.$menu.css("display", "none");
    }
}
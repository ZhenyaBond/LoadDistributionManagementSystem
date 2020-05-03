export function ViewModel(params, ko) {
    const self = this;

    self.friendlyNameProp = "friendlyName";
    self.valueProp = "value";

    self.data = params.data;
    self.containerName = params.containerName;

    self.contextMenuHandler = params.contextMenuHandler;
    self.columnNames = ko.pureComputed(() => {
        if (self.data().length === 0) {
            return [];
        }

        let firstItem = self.data()[0];

        return Object.keys(firstItem).map((key) => firstItem[key][self.friendlyNameProp]);
    });
    self.isAscendingSort = true;
    self.previousPropertyName = "";
    self.sortOrderClassName = "desc-sort-option";

    self.showSort = (value, event) => {
        //let $element = $(event.currentTarget);

        //self.sortOrderClassName = self.isAscendingSort ? "desc-sort-option" : "asc-sort-option";

        //$element.addClass(self.sortOrderClassName);
    };
    self.hideSort = (value, event) => {
        //let $element = $(event.currentTarget);

        //$element.removeClass(self.sortOrderClassName);
    };

    let getProperty = (entity, propertyFriendlyName) => {
        var property;

        Object.keys(entity).forEach(key => {
            if (entity[key][self.friendlyNameProp] === propertyFriendlyName) {
                property = entity[key];
            }
        });

        return property;
    };

    self.getPropValue = (entity, propertyFriendlyName) => {
        return getProperty(entity, propertyFriendlyName).value;
    };

    self.getClass = (entity, propertyFriendlyName) => {
        const prop = getProperty(entity, propertyFriendlyName);
        return prop.gridCenter ? "center-cell" : null;
    };

    self.sort = (propertyFriendlyName) => {
        self.data.sort((a, b) => {
            let firstItemValue = self.getPropValue(a, propertyFriendlyName);
            let secondItemValue = self.getPropValue(b, propertyFriendlyName);

            return firstItemValue() < secondItemValue() ? -1 : 1;
        });

        if (!self.isAscendingSort && self.previousPropertyName === propertyFriendlyName) {
            self.data.reverse();
        }

        self.isAscendingSort = !self.isAscendingSort;
        self.previousPropertyName = propertyFriendlyName;
    };
    self.isHidden = (entity, propertyFriendlyName) => {
        entity = entity ? entity : self.data()[0];

        var property = getProperty(entity, propertyFriendlyName);

        return property.hidden;
    };

    const bindCustomMenu = () => {
        $(`${self.containerName}`).on("contextmenu",
            "#table tbody tr",
            (event) => {
                event.preventDefault();
                let rowIdx = event.currentTarget.rowIndex - 1;

                let viewModel = self.data()[rowIdx];

                self.contextMenuHandler && self.contextMenuHandler({ x: event.pageX, y: event.pageY }, viewModel);

                return false;
            });
    };

    bindCustomMenu();
}
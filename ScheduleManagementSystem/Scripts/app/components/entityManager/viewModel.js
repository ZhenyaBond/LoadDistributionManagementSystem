export function ViewModel(params, ko) {
    const self = this;

    self.viewModel = params.viewModel;
    self.defaults = params.defaults;
    self.title = params.title;

    self.properties = ko.observableArray([]);

    let fillProperties = () => {
        let props = Object.keys(self.viewModel).map(key => self.viewModel[key]["friendlyName"]);

        return props;
    };

    let getProperty = (propertyFriendlyName) => {
        let property;

        Object.keys(self.viewModel).forEach(key => {
            if (self.viewModel[key]["friendlyName"] === propertyFriendlyName) {
                property = self.viewModel[key];
            }
        });

        return property;
    };

    self.getPropValue = (propertyFriendlyName) => {
        return getProperty(propertyFriendlyName).value;
    };
    self.getDefaults = (propertyFriendlyName) => {
        let property = getProperty(propertyFriendlyName);

        return self.defaults[property.data];
    };
    self.isTextProperty = (propertyFriendlyName) => {
        let property = getProperty(propertyFriendlyName);

        return property.type === "text";
    };
    self.isEditable = (propertyFriendlyName) => {
        let property = getProperty(propertyFriendlyName);

        return !property.sealed;
    };
    self.isHidden = (propertyFriendlyName) => {
        let property = getProperty(propertyFriendlyName);

        return property.hidden;
    };

    self.properties(fillProperties());
}   
export function ViewModel(params) {
    const self = this;

    self.linkText = params.text;
    self.destinationUrl = params.href;

    self.linkHandler = () => {
        history.pushState(self.linkText, null, self.destinationUrl);
    };
}
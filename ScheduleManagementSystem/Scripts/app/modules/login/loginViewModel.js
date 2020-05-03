import { login } from "tools/common";

export default class LoginViewModel {
    constructor(ko, callback) {
        this.username = ko.observable("");
        this.password = ko.observable("");
        this.callback = callback;
    }

    onLoginClick = () => {
        $(document).trigger("showPreloader");

        login(this.username(), this.password())
            .then((response) => {
                const { username, access_token } = { ...JSON.parse(response) };

                this.callback({ username: username, token: access_token });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
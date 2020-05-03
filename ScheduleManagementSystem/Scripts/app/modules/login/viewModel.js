import LoginViewModel from "./loginViewModel";
import { setToken } from "tools/common";

export function ViewModel(ko) {
    const self = this;

    self.loginCallback = (token) => {
        setToken(token.token);

        setTimeout(() => {
            $(document).trigger("hidePreloader");

            window.history.pushState("main", null, "/");
        }, 3000);
    };

    self.loginViewModel = new LoginViewModel(ko, self.loginCallback);
}
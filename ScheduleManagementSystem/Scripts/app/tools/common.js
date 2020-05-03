const TOKEN_NAME = "smst";

export function bindErrorHandler() {
    window.addEventListener("error",
        (event) => {
            console.log(event);
        });
}

export function sendServerRequest(type, url, body, token, contentType = "application/json") {
    return new Promise((success, fail) => {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, true);

        xhr.setRequestHeader("Content-Type", contentType);

        if (token) {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        }

        xhr.addEventListener("load", () => {
            if (xhr.status < 400) {
                success(xhr.responseText);
            } else {
                if (xhr.status === 401) {
                    window.history.pushState("Login", null, "/login");
                }

                fail(new Error(`Request failed: ${xhr.statusText}`));
            }
        });

        xhr.addEventListener("error", () => {
            fail(new Error("Network error."));
        });
        xhr.send(body);
    });
}

export function login(username, password) {
    const body = `grant_type=password&username=${username}&password=${password}`;

    return sendServerRequest("post", "/token", body, null, "application/x-www-form-urlencoded");
}

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export function resetToken() {
    return localStorage.setItem(TOKEN_NAME, "");
}

export function setToken(token) {
    return localStorage.setItem(TOKEN_NAME, token);
}

export class Preloader {
    constructor() {
        this.isActive = false;
        this.startEvent = new Event("showPreloader");
        this.stopEvent = new Event("hidePreloader");

        this.initPrealoder();
    }

    createPreloader() {
        if (this.isActive) return;

        let $prealoder = $("<div />", { class: "preloader" });
        this.isActive = true;

        $('body').append($prealoder);
    }

    hidePreloader() {
        if (!this.isActive) return;

        let $preloader = $('body').find(".preloader");
        this.isActive = false;

        $preloader.remove();
    }

    initPrealoder() {
        $(document).on("showPreloader",
            () => {
                this.createPreloader();
            });

        $(document).on("hidePreloader",
            () => {
                this.hidePreloader();
            });
    }
}
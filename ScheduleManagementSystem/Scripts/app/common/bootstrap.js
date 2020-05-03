import linkModule from "./link/bootstrap";
import tableModule from "./table/bootstrap";
import notFoundModule from "./not-found/bootstrap";
import errorModule from "./error/bootstrap";

export default function registerComponents(ko) {
    linkModule(ko);
    tableModule(ko);
    notFoundModule(ko);
    errorModule(ko);
}
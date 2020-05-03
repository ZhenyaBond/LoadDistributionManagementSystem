import entityManagerModule from "./entityManager/bootstrap";
import headerModule from "./header/bootstrap";

export default function registerComponents(ko) {
    entityManagerModule(ko);
    headerModule(ko);
}
import appModule from "./app/bootstrap";
import workloadModule from "./load/bootstrap";
import groupsModule from "./groups/bootstrap";
import mainModule from "./main/bootstrap";
import loginModule from "./login/bootstrap";
import subjectsModule from "./subjects/bootstrap";
import streamsModule from "./streams/bootstrap";
import teachersModule from "./teachers/bootstrap";
import normaModule from "./normas/bootstrap";
import subjectTeacherModule from "./subject-teachers/bootstrap";
import subjectActivityModule from "./subject-activities/bootstrap";
import subjectProfessionModule from "./subject-professions/bootstrap";

export default function registerComponents(ko) {
    appModule(ko);
    workloadModule(ko);
    mainModule(ko);
    groupsModule(ko);
    loginModule(ko);
    subjectsModule(ko);
    teachersModule(ko);
    normaModule(ko);
    streamsModule(ko);
    subjectTeacherModule(ko);
    subjectActivityModule(ko);
    subjectProfessionModule(ko);
}
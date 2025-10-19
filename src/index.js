import "./styles.css";
import { Proj } from "./projects";
import { manipulator } from "./proj-dom";


if (!window.localStorage.all_projs) {
    const all_projs = {}
    all_projs[crypto.randomUUID()] = new Proj('general', true);
    window.localStorage.setItem('all_projs', JSON.stringify(all_projs))
}
manipulator.homePage();

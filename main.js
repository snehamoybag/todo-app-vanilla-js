import LogoEl from "./src/components/LogoEl";
import TodoFormEl from "./src/components/TodoFormEl";
import "./style.css";

const headerEl = document.createElement("header");
headerEl.append(LogoEl());

const mainEl = document.createElement("main");
mainEl.append(TodoFormEl());

document.body.append(headerEl, mainEl);

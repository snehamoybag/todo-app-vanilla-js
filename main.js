import LogoEl from "./src/components/LogoEl";
import TodoFormEl from "./src/components/TodoFormEl";
import TodosContainerEl from "./src/components/TodosContainerEl";
import "./style.css";

const headerEl = document.createElement("header");
headerEl.append(LogoEl());

const mainEl = document.createElement("main");

const todosContainerElId = "todos-container";
const todosContainerEl = TodosContainerEl(todosContainerElId);
const todosFormEl = TodoFormEl(todosContainerElId);

mainEl.append(todosFormEl, todosContainerEl);

document.body.append(headerEl, mainEl);

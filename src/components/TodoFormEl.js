import ScreenReaderOnlyEl from "./ScreenReaderOnlyEl";
import { renderTodosEvent } from "./TodosContainerEl";
import TodoData, { getTodosData, setTodosData } from "../TodoData";
import "../styles/sr-only.css";
import "../styles/todo-form.css";

const TodoTextInputEl = (id) => {
  const inputWrapperEl = document.createElement("p");

  const textInputEl = document.createElement("textarea");
  textInputEl.id = id;
  textInputEl.name = id;
  textInputEl.placeholder = "Do grocery shopping...";
  textInputEl.required = true;

  const textInputLabelEl = document.createElement("label");
  textInputLabelEl.for = id;

  const srOnlyEl = ScreenReaderOnlyEl();
  srOnlyEl.textContent = "Task:";

  textInputLabelEl.append(srOnlyEl, textInputEl);
  inputWrapperEl.append(textInputLabelEl);

  return inputWrapperEl;
};

const TodoFormEl = (todosContainerElId) => {
  const todoFormEl = document.createElement("form");
  const todoFormClassName = "todo-form";
  todoFormEl.classList.add(todoFormClassName);
  todoFormEl.id = "todo-form";
  todoFormEl.method = "POST";
  todoFormEl.action = "/";

  const todoTextInputElId = "todo-input-text";
  const todoTextInputEl = TodoTextInputEl(todoTextInputElId);

  const submitButtonEl = document.createElement("button");
  submitButtonEl.classList.add("btn", "btn--submit");
  submitButtonEl.type = "submit";
  submitButtonEl.id = "btn-todo-submit";
  submitButtonEl.textContent = "Submit";

  todoFormEl.append(todoTextInputEl, submitButtonEl);

  todoFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const domTextInputEl = document.querySelector(`#${todoTextInputElId}`);

    const prevTodosData = getTodosData();
    const todoData = new TodoData(Date.now(), domTextInputEl.value);

    // update todos data
    const newTodosData = [todoData, ...prevTodosData];
    setTodosData(newTodosData);

    // dispatch the custom render event
    const domTodosContainerEl = document.querySelector(
      `#${todosContainerElId}`,
    );
    domTodosContainerEl.dispatchEvent(renderTodosEvent);

    // clear the fields
    domTextInputEl.value = "";
  });

  return todoFormEl;
};

export default TodoFormEl;

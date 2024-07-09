import ScreenReaderOnlyEl from "./ScreenReaderOnlyEl";
import { renderTodosEvent } from "./TodosContainerEl";
import TodoData, { getTodosData, setTodosData } from "../TodoData";

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

const TodoDateInputEl = (id) => {
  const inputWrapperEl = document.createElement("p");

  const dateInputEl = document.createElement("input");
  dateInputEl.type = "date";
  dateInputEl.id = id;
  dateInputEl.name = id;
  dateInputEl.required = true;

  const dateiInputLabelEl = document.createElement("label");
  dateiInputLabelEl.for = id;

  const srOnlyEl = ScreenReaderOnlyEl();
  srOnlyEl.textContent = "Due Date:";

  dateiInputLabelEl.append(srOnlyEl, dateInputEl);
  inputWrapperEl.append(dateiInputLabelEl);

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
  const todoDateInputElId = "todo-input-date";

  const todoTextInputEl = TodoTextInputEl(todoTextInputElId);
  const todoDateInputEl = TodoDateInputEl(todoDateInputElId);

  const submitButtonEl = document.createElement("button");
  submitButtonEl.classList.add("btn", "btn--submit");
  submitButtonEl.type = "submit";
  submitButtonEl.id = "btn-todo-submit";
  submitButtonEl.textContent = "Submit";

  todoFormEl.append(todoTextInputEl, todoDateInputEl, submitButtonEl);

  todoFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const domTextInputEl = document.querySelector(`#${todoTextInputElId}`);
    const domDateInputEl = document.querySelector(`#${todoDateInputElId}`);

    const prevTodosData = getTodosData();
    const todoData = new TodoData(
      Date.now(),
      domTextInputEl.value,
      domDateInputEl.value,
    );

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
    domDateInputEl.value = "";
  });

  return todoFormEl;
};

export default TodoFormEl;

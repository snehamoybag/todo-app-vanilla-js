import ScreenReaderOnlyEl from "./ScreenReaderOnlyEl";
import { getTodosData, setTodosData } from "../TodoData";
import { renderTodosEvent } from "./TodosContainerEl";

const TodoItemEl = (id, todoText = "", todoDate = "") => {
  if (!todoText || !todoDate) {
    throw new Error("Task or Date value cannot be empty.");
  }

  const todoItemEl = document.createElement("div");
  const todoItemElClassName = "todo-item";
  todoItemEl.classList.add(todoItemElClassName);
  todoItemEl.id = id;

  const textEl = document.createElement("p");
  textEl.classList.add(`${todoItemElClassName}__text`);
  textEl.textContent = todoText;

  const dateEl = document.createElement("p");
  dateEl.classList.add(`${todoItemElClassName}__date`);
  dateEl.textContent = `Due on: ${todoDate}`;

  const deleteBtnEl = document.createElement("button");
  deleteBtnEl.classList.add("btn", "btn--delete");
  deleteBtnEl.type = "button";

  deleteBtnEl.addEventListener("click", () => {
    const prevTodosData = getTodosData();
    // delete the todo item data
    const newTodosData = prevTodosData.filter((todoData) => todoData.id !== id);

    // update stored data
    setTodosData(newTodosData);

    // dispatch todos re-render event
    const todosContainerEl = todoItemEl.parentNode;
    todosContainerEl.dispatchEvent(renderTodosEvent);
  });

  const srOnlyDeleteBtnTextEl = ScreenReaderOnlyEl();
  srOnlyDeleteBtnTextEl.textContent = "Delete Task";

  deleteBtnEl.append(srOnlyDeleteBtnTextEl);
  todoItemEl.append(textEl, dateEl, deleteBtnEl);

  return todoItemEl;
};

export default TodoItemEl;

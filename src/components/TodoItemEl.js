import ScreenReaderOnlyEl from "./ScreenReaderOnlyEl";
import { getTodosData, setTodosData } from "../TodoData";
import { renderTodosEvent } from "./TodosContainerEl";
import "../styles/sr-only.css";
import "../styles/todo-item.css";

const TodoItemEl = (id, todoText = "") => {
  if (!todoText) {
    throw new Error("Task cannot be empty.");
  }

  const todoItemEl = document.createElement("div");
  const todoItemElClassName = "todo-item";
  todoItemEl.classList.add(todoItemElClassName);
  todoItemEl.id = id;

  const textEl = document.createElement("p");
  textEl.classList.add(`${todoItemElClassName}__text`);
  textEl.textContent = todoText;

  const deleteBtnEl = document.createElement("button");
  deleteBtnEl.classList.add("btn", "btn--delete");
  deleteBtnEl.type = "button";
  deleteBtnEl.title = "mark as complete";

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
  todoItemEl.append(deleteBtnEl, textEl);

  return todoItemEl;
};

export default TodoItemEl;

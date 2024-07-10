import { getTodosData } from "../TodoData";
import TodoItemEl from "./TodoItemEl";
import "../styles/todos-container.css";

const renderTodosEventName = "renderTodos";

export const renderTodosEvent = new Event(renderTodosEventName);

const TodosContainerEl = (id) => {
  const todosContainerEl = document.createElement("div");
  todosContainerEl.classList.add("todos-container");
  todosContainerEl.id = id;

  const getTodoItemEls = () => {
    const todosData = getTodosData();

    const todoItemEls = todosData.map((todoData) => {
      const todoDataValeus = Object.values(todoData);
      return TodoItemEl(...todoDataValeus);
    });

    return todoItemEls;
  };

  const renderTodoItemEls = () => {
    todosContainerEl.innerHTML = ""; // clear the previous renders
    todosContainerEl.append(...getTodoItemEls());
  };

  // render todos on call/render
  renderTodoItemEls();

  // render todos on custom event dispatch
  todosContainerEl.addEventListener(renderTodosEventName, renderTodoItemEls);

  return todosContainerEl;
};

export default TodosContainerEl;

const TodoItemEl = (todoText = "", todoDate = "") => {
  if (!todoText || !todoDate) {
    throw new Error("Task and Date value cannot be empty.");
  }

  const todoItemEl = document.createElement("div");
  const todoItemElClassName = "todo-item";
  todoItemEl.classList.add(todoItemElClassName);

  const textEl = document.createElement("p");
  textEl.classList.add(`${todoItemElClassName}__text`);
  textEl.textContent = `Task: ${todoText}`;

  const dateEl = document.createElement("p");
  dateEl.classList.add(`${todoItemElClassName}__date`);
  dateEl.textContent = `Due on: ${todoDate}`;

  todoItemEl.append(textEl, dateEl);
  return todoItemEl;
};

export default TodoItemEl;

const TodosContainerEl = (id) => {
  const todosContainerEl = document.createElement("div");
  todosContainerEl.classList.add("todos-container");
  todosContainerEl.id = id;

  return todosContainerEl;
};

export default TodosContainerEl;

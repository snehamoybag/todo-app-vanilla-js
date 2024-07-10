import "../styles/placeholder-todo.css";

const PlaceholderTodoItemEl = () => {
  const placeholderEl = document.createElement("div");
  const placeholderElClassName = "placeholder-todo";
  placeholderEl.classList.add(placeholderElClassName);

  const textEl = document.createElement("p");
  textEl.classList.add(`${placeholderElClassName}__text`);
  textEl.textContent = "Congratulations! You have no task left!";

  placeholderEl.append(textEl);
  return placeholderEl;
};

export default PlaceholderTodoItemEl;

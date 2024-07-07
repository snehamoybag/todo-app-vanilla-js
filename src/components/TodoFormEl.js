const TodoTextInputEl = () => {
  const inputWrapperEl = document.createElement("p");

  const textInputEl = document.createElement("textarea");
  const textInputElId = "todo-input-text";
  textInputEl.id = textInputElId;
  textInputEl.name = textInputElId;
  textInputEl.placeholder = "Do grocery shopping...";

  const textInputLabelEl = document.createElement("label");
  textInputLabelEl.for = textInputElId;

  textInputLabelEl.append(textInputEl);
  inputWrapperEl.append(textInputLabelEl);

  return inputWrapperEl;
};

const TodoDateInputEl = () => {
  const inputWrapperEl = document.createElement("p");

  const dateInputEl = document.createElement("input");
  const dateInputElId = "todo-input-date";
  dateInputEl.type = "date";
  dateInputEl.id = dateInputElId;
  dateInputEl.name = dateInputElId;

  const dateiInputLabelEl = document.createElement("label");
  dateiInputLabelEl.for = dateInputElId;

  dateiInputLabelEl.append(dateInputEl);
  inputWrapperEl.append(dateiInputLabelEl);

  return inputWrapperEl;
};

const TodoFormEl = () => {
  const todoFormEl = document.createElement("form");
  const todoFormClassName = "todo-form";
  todoFormEl.classList.add(todoFormClassName);
  todoFormEl.id = "todo-form";
  todoFormEl.method = "POST";
  todoFormEl.action = "/";

  const submitButtonEl = document.createElement("button");
  submitButtonEl.classList.add("btn", "btn--submit");
  submitButtonEl.type = "submit";
  submitButtonEl.id = "btn-todo-submit";
  submitButtonEl.textContent = "Submit";

  todoFormEl.append(TodoTextInputEl(), TodoDateInputEl(), submitButtonEl);

  return todoFormEl;
};

export default TodoFormEl;

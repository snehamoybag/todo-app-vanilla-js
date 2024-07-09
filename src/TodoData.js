class TodoData {
  constructor(id, todoText = "", todoDueDate = "") {
    this.id = id;
    this.todoText = todoText;
    this.todoDueDate = todoDueDate;
  }
}

export default TodoData;

const dataKey = "todos";

export const getTodosData = () => {
  return JSON.parse(localStorage.getItem(dataKey)) || [];
};

export const setTodosData = (newData) => {
  if (!newData) throw new Error("data value cannot be falsy or empty");
  if (!Array.isArray(newData)) throw new Error("data has to be an array");

  localStorage.setItem(dataKey, JSON.stringify(newData));
};

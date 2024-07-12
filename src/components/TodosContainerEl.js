import { getTodosData, setTodosData } from "../TodoData";
import TodoItemEl from "./TodoItemEl";
import PlaceholderTodoItemEl from "./PlaceholderTodoItemEl";
import "../styles/todos-container.css";

// returns an todo element that is after the cursor
const getDragAfterEl = (containerEl, yPosCursor) => {
  const draggableEls = Array.from(
    containerEl.querySelectorAll(
      "[data-is-dragging='false']", // elems that are not dragging
    ),
  );

  const closesetAfter = draggableEls.reduce(
    (closest, el) => {
      const elBox = el.getBoundingClientRect();
      const yPosElCenter = elBox.top + elBox.height / 2;
      const currentOffset = yPosElCenter - yPosCursor; // distance from the cursor to the current draggable element

      /***** NOTE *****/

      // if currentOffset is >= 0 then we know, the cursor is at the top of the current draggable element
      // if currentOffset is < 0 then we know, the cursor is at the bottom of the current draggable element

      // so when cursor is at the top of the current draggable element, we have to get the currentOffset
      // if the current offset is smaller than the closest found offset,
      // the current draggable element has to be the afterElement we are looking for

      // after element is needed as reference so we can use the insertBefore() method
      // to place the dragging element before it

      /***** END OF NOTE *****/

      if (currentOffset >= 0 && currentOffset < closest.offset) {
        return { offset: currentOffset, element: el };
      } else {
        return closest;
      }
    },
    {
      offset: Number.POSITIVE_INFINITY, // distance from cursor to the closest draggable element
      element: null,
    },
  );

  return closesetAfter.element;
};

const handleDragOver = (event, containerEl) => {
  event.preventDefault(); // enable dropping cursor

  const draggingEl = containerEl.querySelector("[data-is-dragging='true']"); // get by dataset
  const dragAfterEl = getDragAfterEl(containerEl, event.clientY);

  if (dragAfterEl !== null) {
    containerEl.insertBefore(draggingEl, dragAfterEl);
  } else {
    containerEl.append(draggingEl);
  }
};

const handleDrop = (event, containerEl) => {
  // sync data to match ui
  const todoEls = Array.from(containerEl.querySelectorAll(".todo-item"));
  const prevTodosData = getTodosData();

  const reOrderedTodosData = todoEls.map((el) => {
    // return the data item whose id matches the current element id
    return prevTodosData.find((data) => String(el.id) === String(data.id));
  });

  setTodosData(reOrderedTodosData);
};

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
      const todoItemEl = TodoItemEl(...todoDataValeus);
      return todoItemEl;
    });

    return todoItemEls;
  };

  const renderTodoItemEls = () => {
    todosContainerEl.innerHTML = ""; // clear the previous renders

    const todoItemEls = getTodoItemEls();

    if (todoItemEls.length < 1) {
      todosContainerEl.append(PlaceholderTodoItemEl());
    } else {
      todosContainerEl.append(...getTodoItemEls());
    }
  };

  // handle drag and drop of todo elements
  todosContainerEl.addEventListener("dragover", (event) =>
    handleDragOver(event, todosContainerEl),
  );

  todosContainerEl.addEventListener("drop", (event) =>
    handleDrop(event, todosContainerEl),
  );

  // re-render todos on custom event dispatch
  todosContainerEl.addEventListener(renderTodosEventName, renderTodoItemEls);

  // render todos on call/render
  renderTodoItemEls();

  return todosContainerEl;
};

export default TodosContainerEl;

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}

const store = Redux.createStore(todosReducer);

store.subscribe(() => {
  localStorage.setItem("todos", JSON.stringify(store.getState().todos));
});

function addTodoAction(todo) {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
}

function removeTodoAction(id) {
  return {
    type: "REMOVE_TODO",
    payload: id,
  };
}

document.getElementById("addTodo").onclick = function () {
  const input = document.getElementById("todoInput");
  const trimmedText = input.value.trim();

  if (trimmedText) {
    const todo = { id: Date.now(), text: trimmedText };
    store.dispatch(addTodoAction(todo));
    input.value = "";
    renderTodos();
  }
};

function renderTodos() {
  const todos = store.getState().todos;
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = todos
    .map(
      (todo) =>
        `<li>${todo.text} <button onclick="removeTodo(${todo.id})">Delete</button></li>`
    )
    .join("");
}

window.removeTodo = function (id) {
  if (confirm("Are you sure you want to delete this todo?")) {
    store.dispatch(removeTodoAction(id));
    renderTodos();
  }
};

renderTodos();

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    default:
      return state;
  }
}

function editTodoAction(todo) {
  return {
    type: "EDIT_TODO",
    payload: todo,
  };
}

function editTodoHtml(id) {
  const todo = store.getState().todos.find((todo) => todo.id === id);
  const newText = prompt("Enter new text:", todo.text);
  if (newText !== null && newText.trim() !== "") {
    const updatedTodo = { ...todo, text: newText.trim() };
    store.dispatch(editTodoAction(updatedTodo));
  }
}

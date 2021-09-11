let input = document.querySelector("input");
let btn = document.querySelector(".btn");
let root = document.querySelector(".root");

let initialState = {
  allTodos: [],
};

let store = Redux.createStore(reducer);
// let state = store.getState();

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      state.allTodos.push(action.payload);
      return { ...state };
    case "IsCompleted":
      state.allTodos[action.payload.index].isCompleted =
        !state.allTodos[action.payload.index].isCompleted;
      return { ...state };
    case "DELETE":
      state.allTodos.splice(action.payload.index, 1);
      return { ...state };
    default:
      return { ...state };
  }
}

btn.addEventListener("click", (e) => {
  let inputVal = input.value;
  store.dispatch({
    type: "ADD",
    payload: { title: inputVal, isCompleted: false },
  });
  inputVal.value = "";
});

function changeEventHandler(i) {
  store.dispatch({
    type: "IsCompleted",
    payload: {
      index: i,
    },
  });
}

function deleteBtnHandler(i) {
  store.dispatch({
    type: "DELETE",
    payload: {
      index: i,
    },
  });
}

function createUI() {
  root.innerHTML = "";
  store.getState().allTodos.forEach((todo, i) => {
    let todoContainer = document.createElement("div");
    todoContainer.classList.add("flex");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener("change", () => {
      changeEventHandler(i);
    });
    let todoTitle = document.createElement("p");
    todoTitle.innerText = todo.title;
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", () => {
      deleteBtnHandler(i);
    });
    todoContainer.append(checkbox, todoTitle, deleteBtn);
    root.append(todoContainer);
  });
  input.innerText = "";
}

store.subscribe(createUI);

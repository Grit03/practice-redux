import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

const reducer = (todo = [], action) => {
  switch (action.type) {
    case ADD_TODO: {
      return [{ text: action.text, id: action.id }, ...todo];
    }

    case DEL_TODO: {
      const todo = document.querySelector(`#${action.id}`);
      todo.remove();
      return;
    }

    default: {
      return todo;
    }
  }
};

const todoStore = createStore(reducer);

// 삭제되는 경우, 여기서 바로 값을 지워주면 안된다.
// state를 변경하고 그 변경된 값으로 paintTodos를 실행해서 html에 반영해주어야 한다.
const handleDelete = (e) => {
  const { id } = e.target.parentNode;
  // 이렇게 dispatch에 값으로 바로 object를 쓴 다음 넘겨줄 수도 있지만,
  // 관습적으로, reducer 위에 action object를 리턴하는 함수를 선언하고 그 함수의 리턴 값을 통해 값을 전달하는 경우가 많다.
  todoStore.dispatch({ type: DEL_TODO, id });
};

// 삭제 하든, 추가를 하든 실행되는 함수이므로, 추가되는 경우만 생각하면 안된다.
const paintTodos = () => {
  const { text, id } = todoStore.getState()[0];
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  li.innerText = text + " ";
  li.id = id;
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", handleDelete);
  li.appendChild(delBtn);
  ul.appendChild(li);
};
todoStore.subscribe(paintTodos);

// 추가되는 경우, 여기서 바로 값을 생성하면 안된다.
// dispatch를 통해 state를 변경한후 그 변경된 state로 paintTodos를 해서 값을 반영해주어야 한다.
const handleSave = (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  todoStore.dispatch({ type: ADD_TODO, text, id: Date.now() });
};

form.addEventListener("submit", handleSave);

import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

// Action Creator(액션 생성 함수)
// 관습적으로 Reducer Function 위에 쓰인다.
const actionAdd = (text) => {
  return { type: ADD_TODO, text, id: Date.now() };
};

const actionDelete = (id) => {
  return { type: DEL_TODO, id };
};

const reducer = (todos = [], action) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = { text: action.text, id: action.id };
      return [newTodo, ...todos];
    }

    case DEL_TODO: {
      return todos.filter((todo) => todo.id !== action.id);
    }

    default: {
      return todos;
    }
  }
};

const todoStore = createStore(reducer);

// 지우는 경우 action 보내기
const handleDelete = (e) => {
  // id가 String이기때문에 형변환 시켜주어야 한다.
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch(actionDelete(id));
};

// state 변경 시 다시 그리기
const paintTodos = () => {
  // 다시 그려져야 하니까 이전의 내용이 없어져야 한다.
  ul.innerHTML = "";
  const todos = todoStore.getState();
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    li.innerText = todo.text + " ";
    li.id = todo.id;
    delBtn.innerText = "삭제";
    delBtn.addEventListener("click", handleDelete);
    li.appendChild(delBtn);
    ul.appendChild(li);
  });
};

todoStore.subscribe(paintTodos);

// 추가하는 경우 경우 action 보내기
const handleSave = (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  todoStore.dispatch(actionAdd(text));
};

form.addEventListener("submit", handleSave);

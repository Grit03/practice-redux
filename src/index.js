import { createStore } from "redux";

const addBtn = document.querySelector("#add");
const minusBtn = document.querySelector("#minus");
const num = document.querySelector("span");

// string 값 실수 할 수 있으니, 상수로 선언
const ADD = "ADD";
const MINUS = "MINUS";

// reducer -> switch 구문으로 케이스 나누기
const countModifer = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// store 생성
const countStore = createStore(countModifer);

// Listener. state의 변화를 감지하고, 변화가 생길 때마다 실행된다.
const updateState = () => {
  num.innerHTML = countStore.getState();
};

// state가 변경될 때 실행될 함수(Listener)를 등록한다.
countStore.subscribe(updateState);

// span에 들어갈 처음 값을 설정
num.innerHTML = countStore.getState();

// dispatch를 통해 action.type 메세지 전달 시 상수 사용
addBtn.addEventListener("click", () => countStore.dispatch({ type: ADD }));
minusBtn.addEventListener("click", () => countStore.dispatch({ type: MINUS }));

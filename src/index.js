import { createStore } from "redux";

const addBtn = document.querySelector("#add");
const minusBtn = document.querySelector("#minus");
const num = document.querySelector("span");

const countModifer = (count = 0) => {
  // modify state...
  return count;
};
const countStore = createStore(countModifer);

const addBtn = document.querySelector("#add");
const minusBtn = document.querySelector("#minus");
const num = document.querySelector("span");

let count = 0;
num.innerText = count;
const handleAdd = () => {
  count++;
  num.innerText = count;
};
const handleMinus = () => {
  count--;
  num.innerText = count;
};
addBtn.addEventListener("click", handleAdd);
minusBtn.addEventListener("click", handleMinus);

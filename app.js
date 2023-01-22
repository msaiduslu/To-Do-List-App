//******************Elements*******************//

const todoInput = document.getElementById("todo-input");
const Btn = document.querySelector("#todo-button");
const todoUl = document.querySelector("#todo-ul");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

const getTodoListFromLocalStorage = () => {
  todoList.forEach((todoItem) => {
    createTodo(todoItem);
  });
};

Btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (todoInput.value.trim() === "") {
    alert("Please enter new todo text!!!");
    return;
  }

  const newTodo = {
    id: new Date().getTime(),
    completed: false,
    text: todoInput.value,
  };

  createTodo(newTodo);

  todoList.push(newTodo);

  localStorage.setItem("todoList", JSON.stringify(todoList));

  e.target.closest("form").reset();
});

const createTodo = (newTodo) => {
  const { id, completed, text } = newTodo;

  const li = document.createElement("li");
  li.setAttribute("id", id);

  completed ? li.classList.add("checked") : "";

  const icon = document.createElement("i");
  icon.setAttribute("class", "fa-regular fa-square-check");
  li.append(icon);

  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fa-solid fa-square-minus");
  li.append(removeIcon);

  todoUl.prepend(li);
};

todoUl.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");

  if (e.target.classList.contains("fa-square-check")) {
    e.target.closest("li").classList.toggle("checked");
    todoList.map((todo) => {
      if (todo.id == idAttr) {
        todo.completed = !todo.completed;
      }
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else if (e.target.classList.contains("fa-square-minus")) {
    e.target.parentElement.remove();
    todoList = todoList.filter((todo) => todo.id != idAttr);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    alert("diger");
  }
});

/* eslint-disable no-use-before-define */
import './style.css';

const text = document.getElementById('text');
const addTaskButton = document.getElementById('add-task-btn');
const deleteTaskButton = document.getElementById('deleteall-todo-btn');
const saveTaskButton = document.getElementById('save-todo-btn');
const listBox = document.getElementById('listBox');
const saveInd = document.getElementById('saveIndex');

let todoArray = [];
displayTodo();

text.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const todo = localStorage.getItem('todo');
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo);
    }
    todoArray.push(text.value);
    text.value = '';
    localStorage.setItem('todo', JSON.stringify(todoArray));
    displayTodo();
  }
});

deleteTaskButton.addEventListener('click', () => {
  const todo = localStorage.getItem('todo');
  todoArray = JSON.parse(todo);
  todoArray = [];
  localStorage.setItem('todo', JSON.stringify(todoArray));
  displayTodo();
});

function displayTodo() {
  const todo = localStorage.getItem('todo');
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = '';
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='box-chg'>
        <div class="checkBox">
          <input type="checkbox" id="myCheck" onclick="myFunction()" class=""><p class='w-full text-grey-darkest'>${list}</p>
        </div>
        <div class="buttons-list">
        <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
        <button onclick='deleteTodo(${ind})' class='deletefunction flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
        </div>
   </div>`;
  });
  listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
  const todo = localStorage.getItem('todo');
  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem('todo', JSON.stringify(todoArray));
  displayTodo();
}

function edit(ind) {
  saveInd.value = ind;
  const todo = localStorage.getItem('todo');
  todoArray = JSON.parse(todo);
  text.value = todoArray[ind];
  addTaskButton.style.display = 'none';
  saveTaskButton.style.display = 'block';
}

saveTaskButton.addEventListener('click', () => {
  const todo = localStorage.getItem('todo');
  todoArray = JSON.parse(todo);
  const id = saveInd.value;
  todoArray[id] = text.value;
  addTaskButton.style.display = 'block';
  saveTaskButton.style.display = 'none';
  text.value = '';
  localStorage.setItem('todo', JSON.stringify(todoArray));
  displayTodo();
});
/* eslint-disable */
import '@fortawesome/fontawesome-free/js/all.js';

import('./css/style.css');

document.addEventListener('DOMContentLoaded', main);

function main() {
  addTodo();
  document.querySelector('.todos').addEventListener('dragover', function (e) {
    e.preventDefault();
    if (
      !e.target.classList.contains('dragging')
      && e.target.classList.contains('card')
    ) {
      const draggingCard = document.querySelector('.dragging');
      const cards = [...this.querySelectorAll('.card')];
      const currPos = cards.indexOf(draggingCard);
      const newPos = cards.indexOf(e.target);
      if (currPos > newPos) {
        this.insertBefore(draggingCard, e.target);
      } else {
        this.insertBefore(draggingCard, e.target.nextSibling);
      }
      const todos = JSON.parse(localStorage.getItem('todos'));
      const removed = todos.splice(currPos, 1);
      todos.splice(newPos, 0, removed[0]);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  });

  document.querySelectorAll('.edit-btn').forEach((edit) => {
    edit.addEventListener('click', (e) => {
      if (e.target.classList.contains('editInputShow')) {
        const card = e.target.parentElement;
        const input = card.querySelector('.editInput');
        const item = card.querySelector('.item');
        const deleteIcon = card.querySelector('.clear');
        const editBtn = card.querySelector('.edit-btn');

        editBtn.classList.remove('editInputShow');
        input.classList.add('hide');
        deleteIcon.classList.add('clearShow');
        input.classList.add('editInputShow');
        item.classList.add('hide');
        editBtn.classList.add('editInputShow');
        edit.classList.add('hide');
        edit.classList.remove('editInputShow');
      }
    });
  });

  const add = document.getElementById('add-btn');
  const txtInput = document.querySelector('.txt-input');
  add.addEventListener('click', () => {
    const item = txtInput.value.trim();
    if (item) {
      txtInput.value = '';
      const todos = !localStorage.getItem('todos')
        ? []
        : JSON.parse(localStorage.getItem('todos'));
      const currentTodo = {
        id: todos.length + 1,
        item,
        completed: false,
      };
      addTodo([currentTodo]);
      todos.push(currentTodo);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    txtInput.focus();
  });

  document.querySelectorAll('.editInput').forEach((input) => {
    input.addEventListener('keydown', (e) => {
      const item = input.value.trim();
      if (e.keyCode === 13) {
        if (item) {
          const todos = JSON.parse(localStorage.getItem('todos'));
          const currentTodo = todos.find(
            (todo) => parseInt(todo.id, 10) === parseInt(input.dataset.id, 10),
          );

          editTodo(todos.indexOf(currentTodo) + 1, item);
        }
      }
    });
  });

  txtInput.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      add.click();
    }
  });

  document.getElementById('clear-completed').addEventListener('click', () => {
    const deleteIndexes = [];
    document.querySelectorAll('.card.checked').forEach((card) => {
      deleteIndexes.push(
        [...document.querySelectorAll('.todos .card')].indexOf(card),
      );
      card.classList.add('fall');
      card.addEventListener('animationend', () => {
        setTimeout(() => {
          card.remove();
        }, 100);
      });
    });
    removeManyTodo(deleteIndexes);
  });
}

const updateIndex = (arr) => {
  arr.forEach((task, index) => {
    task.id = index + 1;
  });
};

const stateTodo = (index, completed) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos[index].completed = completed;
  localStorage.setItem('todos', JSON.stringify(todos));
};

const removeTodo = (index) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos.slice(index, 1);
  updateIndex(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const editTodo = (index, item) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos[index].item = item;
  updateIndex(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const removeManyTodo = (indexes) => {
  let todos = JSON.parse(localStorage.getItem('todos'));
  todos = todos.filter((todo, index) => !indexes.includes(index));
  updateIndex(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
};

const addTodo = (todos = JSON.parse(localStorage.getItem('todos'))) => {
  if (!todos) {
    return [];
  }

  todos.forEach((todo) => {
    const card = document.createElement('li');
    const cbContainer = document.createElement('div');
    const cbInput = document.createElement('input');
    const check = document.createElement('span');
    const item = document.createElement('p');
    const editInput = document.createElement('input');
    const button = document.createElement('span');
    const edit = document.createElement('span');
    const icon = document.createElement('i');
    const iconEdit = document.createElement('i');
    card.classList.add('card');
    button.classList.add('clear');
    edit.classList.add('editInputShow');
    edit.classList.add('edit-btn');
    cbContainer.classList.add('cb-container');
    cbInput.classList.add('cb-input');
    item.classList.add('item');
    editInput.classList.add('editInput');
    check.classList.add('check');
    button.classList.add('clear');
    icon.classList.add('fa', 'fa-times');
    iconEdit.classList.add('fas', 'fa-ellipsis-v');

    card.setAttribute('draggable', true);
    card.setAttribute('data-id', todo.id);
    cbInput.setAttribute('type', 'checkbox');
    item.textContent = todo.item;

    editInput.setAttribute('type', 'text');
    editInput.setAttribute('data-id', todo.id);
    editInput.setAttribute('value', todo.item);
    editInput.setAttribute('class', 'editInput');
    if (todo.completed) {
      card.classList.add('checked');
      cbInput.setAttribute('checked', 'checked');
    }

    card.addEventListener('dragstart', function () {
      this.classList.add('dragging');
    });
    card.addEventListener('dragend', function () {
      this.classList.remove('dragging');
    });

    cbInput.addEventListener('click', function () {
      const correspondingCard = this.parentElement.parentElement;
      const { checked } = this;
      stateTodo(
        [...document.querySelectorAll('.todos .card')].indexOf(
          correspondingCard,
        ),
        checked,
      );
      checked
        ? correspondingCard.classList.add('checked')
        : correspondingCard.classList.remove('checked');
    });

    button.addEventListener('click', function () {
      const correspondingCard = this.parentElement;
      correspondingCard.classList.add('fall');
      removeTodo(
        [...document.querySelectorAll('.todos .card')].indexOf(
          correspondingCard,
        ),
      );
      correspondingCard.addEventListener('animationend', () => {
        setTimeout(() => {
          correspondingCard.remove();
        }, 100);
      });
    });

    button.appendChild(icon);
    edit.appendChild(iconEdit);
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(editInput);
    card.appendChild(button);
    card.appendChild(edit);
    document.querySelector('.todos').appendChild(card);
  });
  return todos;
};

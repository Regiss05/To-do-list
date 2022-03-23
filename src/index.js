import './style.css';
// import renderlists from './modules/renderList.js';

// const form = document.createElement('form');
// form.classList.add('list-container');

// const orderedList = document.createElement('ul');
// const titleList = document.createElement('li');
// titleList.innerText = 'Todays To Do';

// const addList = document.createElement('li');
// addList.classList.add('input-data');

// it will be assigned inside the addlist
// const inputList = document.createElement('input');
// text/placeholder

// const listItemsList = document.createElement('div');
// const orderedDynamic = document.createElement('ul');
// orderedDynamic.classList.add('list-detail');

// const listButton = document.createElement('li');
// const buttonList = document.createElement('button');

// form.appendChild(orderedList);
// orderedList.appendChild(titleList);
// orderedList.appendChild(addList);
// orderedList.appendChild(listItemsList);
// listItemsList.appendChild(orderedDynamic);
// orderedList.appendChild(listButton);
// listButton.appendChild(buttonList);

const lists = [
  {
    index: 2,
    description: 'PHP',
    completed: true,
  },
  {
    index: 0,
    description: 'JS',
    completed: true,
  },
  {
    index: 1,
    description: 'SWAHILI',
    completed: true,
  },
  {
    index: 3,
    description: 'rwanda',
    completed: true,
  },
];

const renderlists = () => {
  const listselector = document.querySelector('.list-detail');
  let render = '';
  lists.sort((x, y) => x.index - y.index).forEach((listItem) => {
    render += ` 
      <li>
        <input type="checkbox" class="checkbox" ${lists.completed ? 'checked' : ''} > ${listItem.description}
      </li>
      `;
  });
  listselector.innerHTML = render;
};

export default renderlists();

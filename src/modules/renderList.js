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
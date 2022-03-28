export default function checkItem() {
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
    // eslint-disable-next-line no-undef
    removeManyTodo(deleteIndexes);
  });
}

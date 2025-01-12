const menuButton = document.getElementById('menuButton')
const navScroll = document.getElementById('navScroll')

menuButton.addEventListener('click', () => {
    navScroll.classList.toggle('show')
});

const filterButton = document.getElementById('filterButton');
const filterOptions = document.querySelector('.filter-options');

filterButton.addEventListener('click', () => {
    if (filterOptions.style.display === 'none') {
        filterOptions.style.display = 'block'
    } else {
        filterOptions.style.display = 'none'
    }
});

const rangeInput = document.getElementById('pts')
const output = document.getElementById('points-output')

rangeInput.addEventListener('input', () => {
  output.textContent = rangeInput.value
});
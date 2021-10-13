'use strict';
const board = document.querySelector('#board');
const SQUARES_NAMBER = 1026;

for (let i = 0; i < SQUARES_NAMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    board.append(square);
}

const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
};

const setColor = element => {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
};

const removeColor = element => {
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = '0 0 2px #1d1d1d';
};

board.addEventListener('mouseover', event => {
    const target = event.target.closest('.square');
    if (target) { setColor(target); }
});

board.addEventListener('mouseout', event => {
    const target = event.target.closest('.square');
    if (target) { removeColor(target); }
});

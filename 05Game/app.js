'use strict';
const screens = document.querySelectorAll('.screen');
const startButton = document.querySelectorAll('.start');
const timeList = document.querySelector('.time-list');
const timeElement = document.querySelector('#time');
const board = document.querySelector('.board');
const messageEnd = document.querySelector('.message-end');
const reportScore = messageEnd.querySelector('.score');

let score = 0;
let timeValue = 0;
let interval;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomColor = () => {
    const red = getRandomNumber(0, 255);
    const green = getRandomNumber(0, 255);
    const blue = getRandomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
};

const createRandomCircle = () => {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = getRandomNumber(15, 60);

    const { height, width } = board.getBoundingClientRect();
    const y = getRandomNumber(7, height - size - 7);
    const x = getRandomNumber(7, width - size - 7);

    circle.style.width = size + 'px';
    circle.style.height = size + 'px';
    circle.style.top = y + 'px';
    circle.style.left = x + 'px';
    circle.style.background = getRandomColor();

    board.append(circle);
};

const finishGame = () => {
    board.innerHTML = '';
    messageEnd.style.display = 'block';
    reportScore.textContent = score;
    timeElement.parentNode.classList.add('hide');
};

const correctTime = time => {
    if (time < 10) { return '0' + time; }
    return time;
};

const decreaseTime = () => {
    timeValue -= 1;
    timeElement.textContent = '00:' + correctTime(timeValue);
    if (timeValue <= 0) {
        clearInterval(interval);
        finishGame();
    }
};

const startGame = () => {
    timeElement.textContent = '00:' + correctTime(timeValue);
    interval = setInterval(decreaseTime, 1000);
    createRandomCircle();
};


startButton.forEach(item => item.addEventListener('click', event => {
    event.preventDefault();
    messageEnd.style.display = 'none';
    timeElement.parentNode.classList.remove('hide');
    screens[0].classList.add('up');
    screens[1].classList.remove('up');
    screens[2].classList.remove('up');
    score = 0;
}));

timeList.addEventListener('click', event => {
    const target = event.target.closest('.time-btn');
    if (target) {
        timeValue = +target.dataset.time;
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    const target = event.target.closest('.circle');
    if (target) {
        score++;
        target.remove();
        createRandomCircle();
    }
});

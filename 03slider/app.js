'use strict';

const wrapperBarSlides = document.querySelector('.sidebar');

const wrapperMainSlides = document.querySelector('.main-slide');

const countSlides = wrapperMainSlides.querySelectorAll('div').length;

const buttons = document.querySelector('.controls');

const height = parseFloat(getComputedStyle(document.querySelector('.container')).height);

wrapperBarSlides.style.top = `-${(countSlides - 1) * 100}vh`;

let currentIndexSlide = 0;

const setSlide = () => {
    wrapperMainSlides.style.transform = `translateY(-${currentIndexSlide * height}px)`;
    wrapperBarSlides.style.transform = `translateY(+${currentIndexSlide * height}px)`;
};

buttons.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.up-button')) { currentIndexSlide = (currentIndexSlide + 1) % countSlides; }
    if (target.closest('.down-button')) { currentIndexSlide = (currentIndexSlide + countSlides - 1) % countSlides; }

    setSlide();
});

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') { currentIndexSlide = (currentIndexSlide + 1) % countSlides; }
    if (event.key === 'ArrowDown') { currentIndexSlide = (currentIndexSlide + countSlides - 1) % countSlides;  }

    setSlide();
});

'use strict';
const createSlider = () => {
    const slider = document.querySelector('.container');
    const slides = document.querySelectorAll('.slide');

    let currentIndexSlide = 0;

    const setNewSlide = newIndexSlide => {
        slides[currentIndexSlide].classList.remove('active');
        currentIndexSlide = newIndexSlide;
        slides[currentIndexSlide].classList.add('active');
    };

    slider.addEventListener('click', event => {
        const target = event.target.closest('.slide');
        if (target) {
            for (let i = 0; i < slides.length; i++) {
                if (slides[i] === target) { return setNewSlide(i); }
            }
        }
    });

    //for autoPlaySlider
    const setNextSlide = () => {
        slides[currentIndexSlide].classList.remove('active');
        currentIndexSlide = (currentIndexSlide + 1) % slides.length;
        slides[currentIndexSlide].classList.add('active');
    };

    //for autoPlaySlider
    const setPrevSlide = () => {
        slides[currentIndexSlide].classList.remove('active');
        currentIndexSlide = (currentIndexSlide + slides.length - 1) % slides.length;
        slides[currentIndexSlide].classList.add('active');
    };

    //for autoPlaySlider
    const createSetBackAndForth = () => {
        let move = 'forth';
        return () => {
            if (currentIndexSlide === 0) { move = 'forth'; }
            if (currentIndexSlide === (slides.length - 1)) { move = 'back'; }

            if (move === 'forth') { setNextSlide(); }
            if (move === 'back') { setPrevSlide(); }
        };
    };

    let interval;
    const setBackAndForth = createSetBackAndForth();

    const autoPlaySlider = () => {
        interval = setInterval(setBackAndForth, 3000);
    };

    const stopSlider = () => {
        clearInterval(interval);
    };

    slider.addEventListener('mouseover', stopSlider);
    slider.addEventListener('mouseout', autoPlaySlider);
    autoPlaySlider();
};

createSlider();

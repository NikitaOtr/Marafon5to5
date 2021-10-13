'use strict';
const containerForPlaceholders = document.querySelector('.container-placeholder');

let dragger;

// Происходит когда элемент начал перемещаться
containerForPlaceholders.addEventListener('dragstart', event => {
    const target = event.target.closest('.item');
    if (target) {
        dragger = target;
        setTimeout(() => target.classList.add('hide'), 0);
    }
});

// Происходит когда элемент был отбущен
containerForPlaceholders.addEventListener('dragend', event => {
    const target = event.target.closest('.item');
    if (target) { target.classList.remove('hide'); }
});

// Происходит каждые несколько миллисекунд когда элемент находиться над зоной принимающей элементы
containerForPlaceholders.addEventListener('dragover', event => {
    const target = event.target.closest('.zone');
    if (target) { event.preventDefault(); }
});

// Происходит когда элемент оказываеться над зоной принимающей элементы
containerForPlaceholders.addEventListener('dragenter', event => {
    const target = event.target.closest('.zone');
    if (target) {
        target.classList.add('hovered');
    }
});

// Происходит когда элемент выходит за пределы зоной принимающей элементы
containerForPlaceholders.addEventListener('dragleave', event => {
    const target = event.target.closest('.zone');
    if (target) {
        target.classList.remove('hovered');
    }
});

// Происходит когда элемент сбросили на зоной принимающей элементы
containerForPlaceholders.addEventListener('drop', event => {
    const target = event.target;
    const zone = target.closest('.zone');
    if (zone) { zone.classList.remove('hovered'); }

    if (target.matches('.zone')) {
        target.querySelector('.placeholder').append(dragger);
    } else if (target.matches('.placeholder')) {
        target.append(dragger);
    } else if (target.closest('.item')) {
        target.parentNode.before(dragger);
    }
});

import './index.css';

// Переменные

const messageScroll = document.querySelector('.message__scroll');
const messageText = document.querySelector('.message__text');

const popup = document.querySelector('.popup');
const btnOpen = document.querySelector('.key-message__btn');
const btnClose = document.querySelector('.popup__close-btn');

const listFirst = popup.querySelector('.popup__list_first');
const listSecond = popup.querySelector('.popup__list_second');
const pointFirst = popup.querySelector('.popup__point_first');
const pointSecond = popup.querySelector('.popup__point_second');
const btnRight = popup.querySelector('.popup__btn-right');
const btnLeft = popup.querySelector('.popup__btn-left');

// Скролл

messageScroll.onscroll = function() {
    messageText.scrollTop = this.scrollTop
}

// Открытие и закрытие попапа по нажатию кнопки

function popupOpen() {
    popup.classList.add('popup_active');
    document.querySelector('.key-message__advantages').style.display = "none";
    document.querySelector('.key-message__content').style.display = "none";
}

function popupClose() {
    popup.classList.remove('popup_active');
    document.querySelector('.key-message__advantages').style.display = "flex";
    document.querySelector('.key-message__content').style.display = "block";
}

// Пагинатор

function openFirstPage() {
    console.log('left button');
    listFirst.classList.add('popup__list-active');
    listSecond.classList.remove('popup__list-active');
    pointFirst.classList.add('popup__point_active');
    pointSecond.classList.remove('popup__point_active');
}

function openSecondPage() {
    console.log('right button');
    listFirst.classList.remove('popup__list-active');
    listSecond.classList.add('popup__list-active');
    pointFirst.classList.remove('popup__point_active');
    pointSecond.classList.add('popup__point_active');
}

// Слушатели событий

btnRight.addEventListener("click", () => {openSecondPage()});

btnLeft.addEventListener("click", () => {openFirstPage()});

btnOpen.addEventListener("click", () => {popupOpen()});

btnClose.addEventListener("click", () => {popupClose()});


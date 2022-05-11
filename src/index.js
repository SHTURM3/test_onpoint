import './index.css';

// Переменные для реализации кастомного скролла и пагинатора

const btnMoveHomeSection = document.querySelector('.header__link');
const btnMoveNextSection = document.querySelector('.home-page__btn');

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

// Переменные для свайпера
const slider = document.querySelector('.slider');
const sliderList = slider.querySelector('.slider-list');
const sliderTrack = slider.querySelector('.content');
const slides = slider.querySelectorAll('.slide');
let slideWidth = slides[0].offsetWidth;
let slideIndex = 0;
let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posY1 = 0;
let posY2 = 0;
let posFinal = 0;
let isSwipe = false;
let isScroll = false;
let allowSwipe = true;
let transition = true;
let nextTrf = 0;
let prevTrf = 0;
let lastTrf = (slides.length - 1) * slideWidth;
let posThreshold = slides[0].offsetWidth * 0.35;
let trfRegExp = /([-0-9.]+(?=px))/;

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

// Cвайпер

function getEvent() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
}

function slide(index){
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

}

function swipeStart(){
    let evt = getEvent();

    if(allowSwipe) {
        transition = true;

        nextTrf = (slideIndex + 1) * -slideWidth;
        prevTrf = (slideIndex - 1) * -slideWidth;

        posInit = posX1 = evt.clientX;
        posY1 = evt.clientY;

        sliderTrack.style.transition = '';

        document.addEventListener('touchmove', swipeAction);
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);

        sliderList.classList.remove('grab');
        sliderList.classList.add('grabbing');
    }
    
}

function swipeAction(){

    let evt = getEvent();
    let style = sliderTrack.style.transform;
    let transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    // определение действия свайп или скролл
    if (!isSwipe && !isScroll) {
        let posY = Math.abs(posY2);
        if (posY > 7 || posX2 === 0) {
          isScroll = true;
          allowSwipe = false;
        } else if (posY < 7) {
          isSwipe = true;
        }
    }
  
    if (isSwipe) {
        // запрет ухода влево на первом слайде
        if (slideIndex === 0) {
          if (posInit < posX1) {
            setTransform(transform, 0);
            return;
          } else {
            allowSwipe = true;
          }
        }
  
        // запрет ухода вправо на последнем слайде
        if (slideIndex === slides.length - 1) {
          if (posInit > posX1) {
            setTransform(transform, lastTrf);
            return;
          } else {
            allowSwipe = true;
          }
        }
  
        // запрет протаскивания дальше одного слайда
        if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
          reachEdge();
          return;
        }

        sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }
}

function swipeEnd(){
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if(allowSwipe){
        if (Math.abs(posFinal) > posThreshold) {
            if (posInit < posX1) {
                slideIndex--;
            } else if (posInit > posX1) {
                slideIndex++;
            }
        } 

        if (posInit !== posX1) {
            allowSwipe = false;
            slide();
        } else {
            allowSwipe = true;
        }
    } else {
        allowSwipe = true;    
    }
};

function setTransform(transform, comapreTransform) {
    if (transform >= comapreTransform) {
        if (transform > comapreTransform) {
            sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
        }
    }
    allowSwipe = false;
}

function reachEdge() {
    transition = false;
    swipeEnd();
    allowSwipe = true; 
}

// Слушатели событий

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';

btnMoveHomeSection.addEventListener('click', () => {
    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
});

btnMoveNextSection.addEventListener('click', () => {
    slideIndex++;
    slide();
});

btnRight.addEventListener("click", () => {openSecondPage()});

btnLeft.addEventListener("click", () => {openFirstPage()});

btnOpen.addEventListener("click", () => {popupOpen()});

btnClose.addEventListener("click", () => {popupClose()});

sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);






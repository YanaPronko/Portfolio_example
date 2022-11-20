import i18Obj from './translate.js';

const hamburger = document.querySelector(".hamburger"),
  navList = document.querySelector(".nav__list");

function openMenu() {
  hamburger.classList.toggle("open");
  navList.classList.toggle("open");
  }

hamburger.addEventListener("click", openMenu);

function closeMenu(event) {
  if (event.target.classList.contains("nav__link")) {
    hamburger.classList.remove("open");
    navList.classList.remove("open");
  }
}

navList.addEventListener("click", closeMenu);

// Переключение сезонов в портфолио

const portfolioWrapper = document.querySelector('.portfolio__btn-wrapper'),
  portfolioBtns = document.querySelectorAll(".portfolio__btn"),
  portfolioImages = document.querySelectorAll('.portfolio-image');

const seasons = ["winter", "spring", "summer", "autumn"];

function changeImage(event) {
  const season = event.target.dataset.season;
  if (event.target.classList.contains('portfolio__btn')) {
    portfolioImages.forEach((img, index) => img.src = `assets/img/portfolio/${season}/${index + 1}.jpg`);
/* 
    if (event.target.dataset.season == "winter") {
      portfolioImages.forEach((img, index) => img.src = `assets/img/portfolio/winter/${index + 1}.jpg`);
    }else if (event.target.dataset.season == "spring") {
      portfolioImages.forEach((img, index) => img.src = `assets/img/portfolio/spring/${index + 1}.jpg`);
    }else if (event.target.dataset.season == "summer") {
      portfolioImages.forEach((img, index) => img.src = `assets/img/portfolio/summer/${index + 1}.jpg`);
    }else if (event.target.dataset.season == "autumn") {
      portfolioImages.forEach((img, index) => img.src = `assets/img/portfolio/autumn/${index + 1}.jpg`);
    } */
  }
}

portfolioWrapper.addEventListener("click", changeImage);

function preloadImages() {
  seasons.forEach((item) => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `assets/img/potfolio/${item}/${i}.jpg`;
    }
  });
}
    
preloadImages();

// Активная кнопка
const enLang = document.querySelector(".en"),
      ruLang = document.querySelector(".ru");

function changeClassActive(event) {
  if (event.target.classList.contains("portfolio__btn")) {
    portfolioBtns.forEach((item) => {
      item.classList.remove("portfolio__btn_active");
    });
  }
  event.target.classList.add("portfolio__btn_active"); 
}

function changeLangClassActive() {
  enLang.classList.toggle("active");
  ruLang.classList.toggle("active");
}

portfolioWrapper.addEventListener("click", changeClassActive);

// Перевод

function getTranslate(event) {
  const elementsForTranslate = document.querySelectorAll("[data-i18n]");

 /*  elementsForTranslate.forEach((elem) => {
    elem.textContent = i18Obj[event.target][elem.dataset.i18n];
 */
  if (event.target.classList.contains("ru") || localStorage.getItem("lang" ==="ru")) {
       elementsForTranslate.forEach((elem) => {
         elem.textContent = i18Obj.ru[elem.dataset.i18n];
       });
  } else if (event.target.classList.contains("en") || localStorage.getItem("lang" === "en")) {
       elementsForTranslate.forEach((elem) => {
         elem.textContent = i18Obj.en[elem.dataset.i18n];
       });
     } 
  }

ruLang.addEventListener("click", getTranslate);
ruLang.addEventListener("click", changeLangClassActive);
enLang.addEventListener("click", getTranslate);
enLang.addEventListener("click", changeLangClassActive);

// Переключение темы

const arrayOfClasses = [".body", ".section__title", ".skills__item-title", ".title__wrapper", ".skills__item-descr",
  ".price__cards-item__title", ".span", ".portfolio__btn", ".hamburger"];
const themeBtn = document.querySelector(".theme");
const darkBtn = document.querySelector(".dark");
let lightBtn = document.querySelector(".light");
const navLight = document.querySelector(".nav__list");
const hamburgerLight = document.querySelector(".hamburger");
const linkLight = document.querySelectorAll(".nav__link");

function changeMenuTheme() {
  if (hamburgerLight.classList.contains("theme_white-hamburger")) {
    navLight.classList.toggle("theme_white");
    linkLight.forEach((item) => {
      item.classList.toggle("theme_white");
    });
  }
}

function changeTheme() {
  arrayOfClasses.forEach((item) => {
    let elem = document.querySelectorAll(item);
     elem.forEach((element) => {
      if (element.classList.contains("title__wrapper")){
        element.classList.toggle("theme_white-title__wrapper");
      }else if (element.classList.contains("skills__item-title")) {
        element.classList.toggle("theme_white-skills__item-title");
      } else if (element.classList.contains("hamburger")) {
        element.classList.toggle("theme_white-hamburger");
      }
      element.classList.toggle("theme_white");
      // element.classList.toggle("theme_white:hover");
    });
  });
  
}

themeBtn.addEventListener("click", () => {
  darkBtn.classList.toggle("hidden_theme");
  lightBtn.classList.toggle("hidden_theme");
});

themeBtn.addEventListener("click", changeTheme,);
hamburgerLight.addEventListener("click", changeMenuTheme);

//Local Storage

let theme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark";
let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : "en";

function setLocalStorage() {
  localStorage.setItem('lang', lang);
  localStorage.setItem("theme", theme);

}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate();
  } else if (localStorage.getItem("theme")) {
    const theme = localStorage.getItem("theme");
    changeTheme(theme);
  }
}
window.addEventListener('load', getLocalStorage);


// Самооценка
console.log(` 
Сумма баллов: 80 баллов

Смена изображений в секции portfolio +25
при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения 
из папки с соответствующим названием  +20
кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными   +5

Перевод страницы на два языка +25

при клике по надписи ru англоязычная страница переводится на русский язык       +10
при клике по надписи en русскоязычная страница переводится на английский язык     +10
надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем   +5

Переключение светлой и тёмной темы +25

Внешний вид  соответствует макету Вариант № 1
На страницу добавлен переключатель при клике по которому:
тёмная тема приложения сменяется светлой    +10
светлая тема приложения сменяется тёмной    +10
после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении 
и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне)   +5

Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике (из предложенных вариантов) +5
`);
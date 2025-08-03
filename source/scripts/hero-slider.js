// https://swiperjs.com/get-started#installation
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/pagination';

const initSwiperHero = () => {
  const swiperHero = new Swiper('.hero__slider', {
    modules: [Pagination],
    loop: true, // зациклен
    allowTouchMove: true, // свайп и мышка
    // direction: 'horizontal', // по умолчанию
    grabCursor: true,

    pagination: {
      el: '.hero__pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="hero__pagination-button ${className}" data-index="${index}" type="button">
                  <span class="visually-hidden">${index + 1}</span>
                  </button>`;
      }
    },
    breakpoints: {
      1440: {
        allowTouchMove: false,
        grabCursor: false,

      }
    },
  });

  function calculatePaginationPosition() {
    const hero = document.querySelector('.swiper-slide-active.hero__item');

    const activeSlide = document.querySelector('.swiper-slide-active .hero__slid-content');
    const pagination = document.querySelector('.hero__pagination');


    const contentRect = activeSlide.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    let padding = 0;
    const newTop = contentRect.top + 6;
    if (heroRect.width >= 768) {
      padding = 4;
    }
    pagination.style.top = `${newTop + padding}px`;

    // console.log(heroRect.width);
    // console.log(contentRect.width);

    let indent = 0;
    if (heroRect.width <= 767) {
      indent = 24;
    } else if (heroRect.width < 1440) {
      indent = 60;
    } else {
      indent = 116;
    }
    const newLeft = (heroRect.width - contentRect.width) / 2 + indent;
    // console.log(newLeft);

    pagination.style.left = `${newLeft}px`;
  }

  calculatePaginationPosition();

  swiperHero.on('slideChange', () => {
    requestAnimationFrame(() => {
      calculatePaginationPosition();
    });
  });
};

export { initSwiperHero };

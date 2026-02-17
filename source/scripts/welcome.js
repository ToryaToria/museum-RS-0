import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import 'swiper/css';
import 'swiper/css/pagination';
const paginationFractionEl = document.querySelector('.welcome__slider-numbers');

//добавляю "0" перед числом до 10
const addZero = (num) => {
  return (num > 9) ? num : '0' + num;
}

const initSwiperWelcome = () => {
  const swiperWelcome = new Swiper
    ('.welcome__slider',
      {
        modules: [Navigation, Pagination],
        loop: true,
        allowTouchMove: true,
        grabCursor: true,

        spaceBetween: 20,
        watchOverflow: true,
        slidesPerView: 1,

        pagination: {
          el: '.welcome__slider-pagination',
          clickable: true,
          renderBullet: function (activeIndex, className) {
            return `<button class="welcome__slider-bullit ${className}" type="button"></button>`;
          },
        },

        navigation: {
          nextEl: '.welcome__slider-arr--right',
          prevEl: '.welcome__slider-arr--left',
        },

        breakpoints: {
          1920: {
            spaceBetween: 240,
            slidesPerView: 1,

          },
        },
      }
    );


  if (paginationFractionEl) {
    paginationFractionEl.innerHTML = `
      <span class="current">${addZero(1)}</span> / <span class="total">${addZero(swiperWelcome.slides.length)}</span>
    `;

    swiperWelcome.on('slideChange', function () {
      const fractionCurrent = paginationFractionEl.querySelector('.current');
      const fractionTotal = paginationFractionEl.querySelector('.total');

      if (fractionCurrent && fractionTotal) {
        fractionCurrent.textContent = addZero(swiperWelcome.realIndex + 1);
        fractionTotal.textContent = addZero(swiperWelcome.slides.length);
      }
    });
  }
};

export { initSwiperWelcome };

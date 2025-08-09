// https://swiperjs.com/get-started#installation
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import 'swiper/css';
import 'swiper/css/pagination';

const strCount = document.querySelector('.welcome__str-count');
const strNumber = document.querySelector('.welcome__str-number');

const welcomeItems = document.querySelectorAll('.welcome__item');


strCount.textContent = '0' + String(welcomeItems.length);
// console.log('welcome');


const initSwiperWelcome = () => {
  const swiperWelcome = new Swiper
    ('.welcome__slider',
      {
        modules: [Navigation, Pagination],
        loop: true, // зациклен
        allowTouchMove: true, // свайп и мышка
        // direction: 'horizontal', // по умолчанию
        grabCursor: true,

        spaceBetween: 20,
        watchOverflow: true,
        slidesPerView: 1,

        pagination: {
          el: '.welcome__slider-pagination',
          clickable: true,
          renderBullet: function (activeIndex, className) {
            return `<button class="welcome__slider-bullit ${className}" data-index="${activeIndex}" type="button">
                  <span class="visually-hidden">слайд ${activeIndex + 1}</span>
                  </button>`;
          }
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
        }
      }
    );

  swiperWelcome.on('slideChange', () => {
    // console.log('slider change');
    // console.log(swiperWelcome.activeIndex);

    // console.log(welcomeItems[swiperWelcome.activeIndex].dataset.swiperSlideIndex);

    strNumber.textContent = '0' + String(swiperWelcome.activeIndex + 1);
  });
};

// welcomeItems.forEach(item => {
//       console.log(item.dataset.swiperSlideIndex);

// });

export { initSwiperWelcome };



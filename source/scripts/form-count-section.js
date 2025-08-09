const counters = document.querySelectorAll('[data-counter]');
// console.log('счетчик');
// console.log(counters);
const total = document.querySelector('.form__price-total');
let totalNumber = 0;
// console.log(totalNumber);

// const countTotal = () => {
// totalNumber =
// }


if (counters) {
  counters.forEach(counter => {

    // console.log(counter);

    //  const btn = counter.querySelector('.form_count-btn');
    //   console.log(btn);

    const btnIncr = counter.querySelector('.form_count-btn--plus');
    const btnDecr = counter.querySelector('.form_count-btn--minus');

    // console.log(btnIncr);
    // console.log(btnDecr);

    const field = counter.querySelector('.form__number');
    let value = field.value;
    // console.log(value);

    btnIncr.addEventListener('click', e => {
      // const target = e.target;
      value = field.value;
      value++;
      field.value = value;
      // console.log(value);

    });

    btnDecr.addEventListener('click', e => {
      value = field.value;
      if (value <= 0) {
        value = 0;
        btnDecr.classList.add('.disabled');
      } else {
        value--;
        btnDecr.classList.remove('.disabled');
      }

      field.value = value;
    }
    )
  })
}

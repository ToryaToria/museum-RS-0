const btnOpen = document.querySelector('.form__btn');
const btnClose = document.querySelector('.mo-form__btn-open');
const mo = document.querySelector('.mo-form');
const body = document.body;

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeMenu();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target === body) {
    closeMenu();
  }
};

function closeMenu() {
  mo.classList.remove('mo-form--open');

  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onDocumentClick);
  body.classList.remove('overlay');
}

btnOpen.addEventListener('click', e => {
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onDocumentClick);

  mo.classList.add('mo-form--open');
    body.classList.add('overlay');


});

btnClose.addEventListener('click', closeMenu);






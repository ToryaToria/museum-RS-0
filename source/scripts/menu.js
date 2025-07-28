const btnMenu = document.querySelector('.header__burger');
const body = document.body;
const nav = document.querySelector('.header__nav');
const navLink = document.querySelectorAll('.nav__link')

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
  btnMenu.classList.remove('header__burger--closer');
  nav.classList.remove('header__nav--open');

  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onDocumentClick);
  body.classList.remove('overlay');
}

btnMenu.addEventListener('click', () => {
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onDocumentClick);

  btnMenu.classList.toggle('header__burger--closer');
  nav.classList.toggle('header__nav--open');
  body.classList.add('overlay');

});

navLink.forEach((elem) => {
  elem.addEventListener('click', () => {
    closeMenu();
  });
});

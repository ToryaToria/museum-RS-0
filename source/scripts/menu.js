const btnMenu = document.querySelector('.header__burger');
const body = document.body;
const nav = document.querySelector('.header__nav');

const navLink = document.querySelectorAll('.nav__link')

function closeMenu () {
  btnMenu.classList.remove('header__burger--closer');
  nav.classList.remove('header__nav--open');
}

btnMenu.addEventListener('click', () => {

  btnMenu.classList.toggle('header__burger--closer');
  nav.classList.toggle('header__nav--open');
  });

navLink.forEach((elem) => {
  elem.addEventListener('click', () => {
    closeMenu();
  });
});

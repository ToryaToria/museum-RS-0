const btnMenu = document.querySelector('.header__burger');
const body = document.body;
const nav = document.querySelector('.header__nav');
const navLink = document.querySelectorAll('.nav__link')
let isMenuOpen = false;


const allLinks = nav.querySelectorAll('a[href]');
const visibleLinks = [];
visibleLinks.push(btnMenu);

allLinks.forEach(link => {
  let isVisible = true;
  let currentElement = link;

  while (currentElement && currentElement !== document.body) {
    const style = window.getComputedStyle(currentElement);
    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) {
      isVisible = false;
      break;
    }
    currentElement = currentElement.parentElement;
  }

  if (isVisible) {
    visibleLinks.push(link);
  }
});

const firstFocusEl = visibleLinks[0];
let lastFocusEl = null;

// Определяем lastFocusEl только если есть видимые ссылки
if (visibleLinks.length > 1) {
  lastFocusEl = visibleLinks[visibleLinks.length - 1];
} else {
  // Если нет видимых ссылок, то последним элементом для фокуса может быть сам btnMenu
  lastFocusEl = btnMenu;
}

const trapFocus = (e) => {
  console.log("document.activeElement");
  console.log(document.activeElement);
  console.log('tab');

  if (e.key === 'Tab') {
    console.log(document.activeElement === firstFocusEl);
    console.log(document.activeElement);
    console.log(firstFocusEl);

    // Проверяем, действительно ли фокус на первом элементе, чтобы перенаправить его на последний
    if (e.shiftKey && document.activeElement === firstFocusEl) {
      console.log('1111');

      e.preventDefault(); // Предотвращаем стандартное поведение Tab
      lastFocusEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusEl) {
      console.log('222');

      e.preventDefault(); // Предотвращаем стандартное поведение Tab
      firstFocusEl.focus();
    }
  }
};


const isEscapeKey = (evt) => evt.key === 'Escape';

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
  isMenuOpen = false;
  btnMenu.classList.remove('header__burger--closer');
  nav.classList.remove('header__nav--open');
  visibleLinks.forEach((link) => {
    link.setAttribute('tabindex', '-1');
  });
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onDocumentClick);
  body.classList.remove('overlay');
  nav.removeEventListener('keydown', trapFocus);

}

function openMenu() {
  isMenuOpen = true;
  document.addEventListener('keydown', onDocumentKeydown);
  body.addEventListener('click', onDocumentClick);

  btnMenu.classList.toggle('header__burger--closer');
  nav.classList.toggle('header__nav--open');
  body.classList.add('overlay');
  visibleLinks.forEach((link) => {
    link.setAttribute('tabindex', '0');
  });

  nav.addEventListener('keydown', trapFocus);
}


btnMenu.addEventListener('click', () => {
  console.log(isMenuOpen);
  if (isMenuOpen) {
    closeMenu();
  } else {
    openMenu();
  }

});

navLink.forEach((elem) => {
  elem.addEventListener('click', () => {
    closeMenu();
  });
});



  document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const closeBtn = document.querySelector(".close-btn");
    const menuOverlay = document.getElementById("menu");
    const headerBg = document.querySelector(".header-background");
    const welcomeContent = document.querySelector(".welcome__content");

    document.addEventListener("scroll", () => {
      if (!headerBg) return;
      if (window.scrollY > 40) {
        headerBg.classList.add("scrolled");
      } else {
        headerBg.classList.remove("scrolled");
      }
    });

    burger.addEventListener("click", () => {
      menuOverlay.classList.add("active");
      headerBg.classList.add("menu-open");
      document.body.style.overflow = "hidden";
      if (welcomeContent) {
        welcomeContent.classList.add("hidden");
      }
    });

    closeBtn.addEventListener("click", () => {
      menuOverlay.classList.remove("active");
      headerBg.classList.remove("menu-open");
      document.body.style.overflow = "";
      if (welcomeContent) {
        welcomeContent.classList.remove("hidden");
      }
    });

    document.querySelectorAll(".menu__list a").forEach((link) => {
      link.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
        headerBg.classList.remove("menu-open");
        document.body.style.overflow = "";
        if (welcomeContent) {
          welcomeContent.classList.remove("hidden");
        }
      });
    });

    const slides = document.querySelectorAll('.welcome__slide');
    const dots = document.querySelectorAll('.dot');
    const counter = document.querySelector('.welcome__slider-counter');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlider(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      counter.textContent = `${String(index + 1).padStart(2, '0')} | ${String(totalSlides).padStart(2, '0')}`;
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider(currentIndex);
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider(currentIndex);
    }


    rightArrow.addEventListener('click', showNext);
    leftArrow.addEventListener('click', showPrev);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider(currentIndex);
      });
    });

    let startX = 0;
    const sliderBlock = document.querySelector('.welcome__image-slider');

    sliderBlock.addEventListener('mousedown', (e) => {
      startX = e.clientX;
    });

    sliderBlock.addEventListener('mouseup', (e) => {
      const diff = e.clientX - startX;
      if (diff > 50) showPrev();
      if (diff < -50) showNext();
    });

    updateSlider(currentIndex);
  });


const videoData = [
  { id: 'zp1BXPX8jcU', title: 'Louvre Inside', poster: 'images/museum-video.png' },
  { id: 'Vi5D6FKhRmo', title: 'Paris Museum Tour', poster: 'images/two-women.png' },
  { id: 'NOhDysLnTvY', title: 'Art Exploration', poster: 'images/man-not-hand.png' },
  { id: 'aWmJ5DgyWPI', title: 'Virtual Gallery', poster: 'images/poster2.png' },
  { id: '2OR0OCr6uRE', title: 'Masterpieces Walk', poster: 'images/poster4.jpg' }
];

let activeIndex = 0;
let thumbWindowStart = 0;
let isPlaying = false;

const mainVideo = document.getElementById('main-video');
const thumbnailsBlock = document.getElementById('thumbnails');
const dotsBlock = document.getElementById('dots');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');


// const THUMBS_VISIBLE = 3;
function getThumbsVisible() {
  if (window.innerWidth <= 768) return 2;
  return 3;
}


function renderMainVideo() {
  mainVideo.innerHTML = '';
  if (isPlaying) {

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoData[activeIndex].id}?autoplay=1&enablejsapi=1`;
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.frameBorder = "0";
    iframe.width = "100%";
    iframe.height = "100%";
    mainVideo.appendChild(iframe);
  } else {

    const img = document.createElement('img');
    img.src = videoData[activeIndex].poster;
    img.alt = 'Video Poster';
    img.className = 'video__poster';
    mainVideo.appendChild(img);

    const playBtn = document.createElement('div');
    playBtn.className = 'video__play';
    playBtn.innerHTML = `<img src="images/video-click.png" alt="Play">`;
    playBtn.onclick = () => {
      isPlaying = true;
      renderMainVideo();
    };
    mainVideo.appendChild(playBtn);
  }
}


function renderThumbnails() {
  thumbnailsBlock.innerHTML = '';
  const thumbsVisible = getThumbsVisible();
  for (let i = 0; i < thumbsVisible; i++) {
    let vidIndex = (thumbWindowStart + i) % videoData.length;
    const thumb = document.createElement('div');
    thumb.className = 'video__thumb';
    if (vidIndex === activeIndex) thumb.classList.add('active');
    thumb.innerHTML = `
      <img src="${videoData[vidIndex].poster}" alt="${videoData[vidIndex].title}" class="video__thumb-img">
      <div class="video__thumb-overlay">
        <span class="video__thumb-title">${videoData[vidIndex].title}</span>
      </div>
      <div class="video__thumb-play">
        <img src="images/youtube-icon.png" alt="youtube-icon">
      </div>
    `;
    thumb.onclick = () => {
      activeIndex = vidIndex;
      isPlaying = false;
      renderMainVideo();
      renderThumbnails();
      renderDots();
    };
    thumbnailsBlock.appendChild(thumb);
  }
}


function renderDots() {
  dotsBlock.innerHTML = '';
  for (let i = 0; i < videoData.length; i++) {
    const dot = document.createElement('span');
    dot.className = 'video__dot';
    if (i === thumbWindowStart) dot.classList.add('active');
    dot.onclick = () => {
      thumbWindowStart = i;
      renderThumbnails();
      renderDots();
    };
    dotsBlock.appendChild(dot);
  }
}
arrowLeft.onclick = () => {
  thumbWindowStart = (thumbWindowStart - 1 + videoData.length) % videoData.length;
  renderThumbnails();
  renderDots();
};
arrowRight.onclick = () => {
  thumbWindowStart = (thumbWindowStart + 1) % videoData.length;
  renderThumbnails();
  renderDots();
};

function stopMainVideo() {
  isPlaying = false;
  renderMainVideo();
}

arrowLeft.addEventListener('click', stopMainVideo);
arrowRight.addEventListener('click', stopMainVideo);
dotsBlock.addEventListener('click', stopMainVideo);

renderMainVideo();
renderThumbnails();
renderDots();

window.addEventListener('resize', () => {
  const maxStart = videoData.length - getThumbsVisible();
  if (thumbWindowStart > maxStart) {
    thumbWindowStart = 0;
  }
  renderThumbnails();
  renderDots();
});


document.addEventListener('DOMContentLoaded', () => {
  const imgs = document.querySelectorAll('.gallery .gallery__img');
  if (!imgs.length) return;


  imgs.forEach((img, i) => {
    const delay = (i % 6) * 80;
    img.style.setProperty('--d', `${delay}ms`);
  });


  function resetInstant(el) {
    el.style.transition = 'none';
    el.classList.remove('is-visible');
    el.offsetHeight;
    el.style.transition = '';
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
      } else {
        resetInstant(el);
      }
    });
  }, {
    threshold: 0.15,
    root: null,
    rootMargin: '0px 0px -10% 0px'
  });

  imgs.forEach(img => io.observe(img));
});


document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.tickets');
  if (!section) return;

  const radios = Array.from(section.querySelectorAll('input[type="radio"][name="type"]'));
  const qtyInputs = Array.from(section.querySelectorAll('.tickets__amount-input'));
  const totalEl = section.querySelector('.tickets__total-currency');

  const BASIC_PRICES = [20, 25, 40];
  const STORAGE_KEY = 'ticketsCalc';


  const clampInt = (n, min, max) => Math.min(max, Math.max(min, n));
  const parseQty = (v) => clampInt(parseInt(String(v).replace(/[^\d]/g, ''), 10) || 0, 0, 999);
  const formatEuro = (num) => '€' + (Number.isInteger(num) ? num : num.toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1'));

  const getTypeIndex = () => Math.max(0, radios.findIndex(r => r.checked));

  function calcAndRender() {
    const typeIdx = getTypeIndex();
    const basicPrice = BASIC_PRICES[typeIdx];
    const seniorPrice = basicPrice / 2;

    const basicQty  = parseQty(qtyInputs[0]?.value ?? 0);
    const seniorQty = parseQty(qtyInputs[1]?.value ?? 0);

    const total = basicQty * basicPrice + seniorQty * seniorPrice;
    totalEl.textContent = formatEuro(total);


    if (qtyInputs[0]) qtyInputs[0].value = basicQty;
    if (qtyInputs[1]) qtyInputs[1].value = seniorQty;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      typeIndex: typeIdx,
      basicQty,
      seniorQty
    }));
  }

  function restore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const { typeIndex, basicQty, seniorQty } = JSON.parse(raw);

      if (Number.isInteger(typeIndex) && radios[typeIndex]) {
        radios[typeIndex].checked = true;
      }
      if (qtyInputs[0] && Number.isInteger(basicQty))  qtyInputs[0].value = clampInt(basicQty, 0, 999);
      if (qtyInputs[1] && Number.isInteger(seniorQty)) qtyInputs[1].value = clampInt(seniorQty, 0, 999);
    } catch { }
  }

  restore();
  calcAndRender();

  radios.forEach(radio => {
    radio.addEventListener('change', calcAndRender);
  });

  qtyInputs.forEach((input, idx) => {
    const group = input.closest('.tickets__input-group');
    const [minusBtn, plusBtn] = group ? group.querySelectorAll('.tickets__amount-btn') : [];

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        const v = parseQty(input.value) - 1;
        input.value = Math.max(0, v);
        calcAndRender();
      });
    }
    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        const v = parseQty(input.value) + 1;
        input.value = v;
        calcAndRender();
      });
    }

    input.addEventListener('input', () => {
      input.value = parseQty(input.value);
      calcAndRender();
    });
    input.addEventListener('blur', () => {
      input.value = parseQty(input.value);
      calcAndRender();
    });
  });
});

// === Ticket Modal
document.addEventListener('DOMContentLoaded', () => {
  const BASIC_PRICES = [20, 25, 40];
  const STORAGE_KEY = 'ticketsCalc';
  const STORAGE_BOOK = 'ticketPurchase';

  const ticketsSection = document.querySelector('.tickets');
  if (!ticketsSection) return;

  const pageRadios = Array.from(ticketsSection.querySelectorAll('input[type="radio"][name="type"]'));
  const pageQtyInputs = Array.from(ticketsSection.querySelectorAll('.tickets__amount-input'));

  const modal = document.getElementById('ticketModal');
  const overlay = document.getElementById('ticketModalOverlay');
  const closeBtn = document.getElementById('ticketModalClose');
  const buyBtn = ticketsSection.querySelector('.tickets__buy');

  const tmDate = document.getElementById('tmDate');
  const tmTime = document.getElementById('tmTime');
  const tmTypeRadios = Array.from(document.querySelectorAll('input[name="tmType"]'));
  const tmBasic = document.getElementById('tmBasic');
  const tmSenior = document.getElementById('tmSenior');

  const pvDate = document.getElementById('pvDate');
  const pvTime = document.getElementById('pvTime');
  const pvType = document.getElementById('pvType');
  const pvBasicQty = document.getElementById('pvBasicQty');
  const pvSeniorQty = document.getElementById('pvSeniorQty');
  const pvBasicSum = document.getElementById('pvBasicSum');
  const pvSeniorSum = document.getElementById('pvSeniorSum');
  const pvTotal = document.getElementById('pvTotal');

  const typeLabel = (idx) => ['Permanent exhibition','Temporary exhibition','Combined Admission'][idx] || 'Permanent exhibition';

  const clampInt = (n, min, max) => Math.min(max, Math.max(min, n));
  const parseQty = (v) => clampInt(parseInt(String(v).replace(/[^\d]/g, ''), 10) || 0, 0, 999);
  const euro = (n) => '€' + (Number.isInteger(n) ? n : n.toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1'));


  function fillTimeOptions(selected) {
    tmTime.innerHTML = '';
    const pad = (x) => String(x).padStart(2,'0');
    for (let h = 9; h <= 18; h++) {
      for (let m = 0; m < 60; m += 30) {
        const label = `${pad(h)}:${pad(m)}`;

        if (h === 18 && m > 0) break;
        const opt = document.createElement('option');
        opt.value = label;
        opt.textContent = label;
        tmTime.appendChild(opt);
      }
    }
    if (selected && Array.from(tmTime.options).some(o => o.value === selected)) {
      tmTime.value = selected;
    } else {
      tmTime.selectedIndex = 0;
    }
  }


  function setMinDate(today = new Date()) {
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth()+1).padStart(2,'0');
    const dd = String(today.getDate()).padStart(2,'0');
    const val = `${yyyy}-${mm}-${dd}`;
    tmDate.min = val;
    if (!tmDate.value || tmDate.value < val) tmDate.value = val;
  }

  function readPageState() {
    const typeIdx = Math.max(0, pageRadios.findIndex(r => r.checked));
    const basicQty = parseQty(pageQtyInputs[0]?.value ?? 0);
    const seniorQty = parseQty(pageQtyInputs[1]?.value ?? 0);
    return { typeIdx, basicQty, seniorQty };
  }

  function saveTicketsState(typeIdx, basicQty, seniorQty) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ typeIndex: typeIdx, basicQty, seniorQty }));
  }


  function saveBookingState() {
    localStorage.setItem(STORAGE_BOOK, JSON.stringify({ date: tmDate.value, time: tmTime.value }));
  }


  function restoreBookingState() {
    const raw = localStorage.getItem(STORAGE_BOOK);
    let timeVal = null, dateVal = null;
    if (raw) {
      try {
        const j = JSON.parse(raw);
        dateVal = j.date || null;
        timeVal = j.time || null;
      } catch {}
    }
    setMinDate();
    if (dateVal && dateVal >= tmDate.min) tmDate.value = dateVal;

    fillTimeOptions(timeVal);
  }

  function recalcPreview() {
    const typeIdx = Number(tmTypeRadios.find(r => r.checked)?.value ?? 0);
    const basicPrice = BASIC_PRICES[typeIdx];
    const seniorPrice = basicPrice / 2;

    const bq = parseQty(tmBasic.value);
    const sq = parseQty(tmSenior.value);

    pvDate.textContent = tmDate.value || '—';
    pvTime.textContent = tmTime.value || '—';
    pvType.textContent = typeLabel(typeIdx);

    pvBasicQty.textContent = bq;
    pvSeniorQty.textContent = sq;

    const bSum = bq * basicPrice;
    const sSum = sq * seniorPrice;
    pvBasicSum.textContent = euro(bSum);
    pvSeniorSum.textContent = euro(sSum);
    pvTotal.textContent = euro(bSum + sSum);

    saveTicketsState(typeIdx, bq, sq);
    saveBookingState();
  }

  function openModal(prefillFromPage = true) {

    if (prefillFromPage) {
      const { typeIdx, basicQty, seniorQty } = readPageState();
      tmTypeRadios.forEach(r => r.checked = Number(r.value) === typeIdx);
      tmBasic.value = basicQty;
      tmSenior.value = seniorQty;
    }

    restoreBookingState();

    recalcPreview();

    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  buyBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(true);
  });

  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

  tmDate.addEventListener('change', () => {

    if (tmDate.value < tmDate.min) tmDate.value = tmDate.min;
    recalcPreview();
  });
  tmTime.addEventListener('change', recalcPreview);

  tmTypeRadios.forEach(r => r.addEventListener('change', recalcPreview));

  const adjust = (input, delta) => {
    const v = parseQty(input.value) + delta;
    input.value = clampInt(v, 0, 999);
    recalcPreview();
  };

  modal.addEventListener('click', (e) => {
    const role = e.target.getAttribute('data-role');
    if (!role) return;
    if (role === 'basic-inc')  adjust(tmBasic, +1);
    if (role === 'basic-dec')  adjust(tmBasic, -1);
    if (role === 'senior-inc') adjust(tmSenior, +1);
    if (role === 'senior-dec') adjust(tmSenior, -1);
  });

  tmBasic.addEventListener('input', () => { tmBasic.value = parseQty(tmBasic.value); recalcPreview(); });
  tmSenior.addEventListener('input', () => { tmSenior.value = parseQty(tmSenior.value); recalcPreview(); });

  fillTimeOptions();
  setMinDate();
});

// === Ticket Modal: validation
(function () {
  const nameInput  = document.getElementById('tmName');
  const emailInput = document.getElementById('tmEmail');
  const phoneInput = document.getElementById('tmPhone');
  const errName  = document.getElementById('errName');
  const errEmail = document.getElementById('errEmail');
  const errPhone = document.getElementById('errPhone');
  const payBtn   = document.getElementById('tmPay');

  if (!nameInput || !emailInput || !phoneInput) return;

  const NAME_RE  = /^[A-Za-zА-Яа-яЁё ]{3,15}$/;

  const EMAIL_RE = /^[A-Za-z0-9_-]{3,15}@[A-Za-z]{4,}\.[A-Za-z]{2,}$/;

  function validateName(v) {
    const val = v.trim();
    if (!val) return { ok: false, msg: 'Введите имя' };
    if (!NAME_RE.test(val)) {
      return { ok: false, msg: '3–15 букв (A-Я, A-Z) и пробелы' };
    }
    return { ok: true };
  }

  function validateEmail(v) {
    const val = v.trim();
    if (!val) return { ok: false, msg: 'Введите e-mail' };
    if (/\s/.test(val)) return { ok: false, msg: 'Пробелы в e-mail недопустимы' };
    if (!EMAIL_RE.test(val)) {
      return { ok: false, msg: 'Формат: username@example.com (username 3–15 символов: буквы/цифры/_/-; домен ≥4 лат.букв; TLD ≥2)' };
    }
    return { ok: true };
  }

  function validatePhone(v) {
    const s = v.trim();
    if (!s) return { ok: false, msg: 'Введите телефон' };
    if (/[^0-9 \-]/.test(s)) return { ok: false, msg: 'Только цифры, пробелы и дефисы' };

    const digits = s.replace(/[ \-]/g, '');
    if (digits.length === 0 || digits.length > 10) {
      return { ok: false, msg: 'Не более 10 цифр' };
    }
    if (/^\d{1,10}$/.test(s)) return { ok: true };

    const parts = s.split(/[ \-]/);
    if (parts.some(p => p.length === 0 || !/^\d+$/.test(p))) {
      return { ok: false, msg: 'Неверное разделение' };
    }
    if (parts.some(p => p.length < 2 || p.length > 3)) {
      return { ok: false, msg: 'Группы должны быть по 2–3 цифры' };
    }
    return { ok: true };
  }

  function setValidity(input, errorEl, res) {
    const field = input.closest('.tm-field');
    if (res.ok) {
      input.classList.remove('invalid');
      input.setAttribute('aria-invalid', 'false');
      if (field) field.classList.remove('error');
      errorEl.textContent = '';
    } else {
      input.classList.add('invalid');
      input.setAttribute('aria-invalid', 'true');
      if (field) field.classList.add('error');
      errorEl.textContent = res.msg;
    }
    return res.ok;
  }

  function validateAll() {
    const okName  = setValidity(nameInput,  errName,  validateName(nameInput.value));
    const okEmail = setValidity(emailInput, errEmail, validateEmail(emailInput.value));
    const okPhone = setValidity(phoneInput, errPhone, validatePhone(phoneInput.value));
    return okName && okEmail && okPhone;
  }

  nameInput.addEventListener('input',  () => setValidity(nameInput,  errName,  validateName(nameInput.value)));
  emailInput.addEventListener('input', () => setValidity(emailInput, errEmail, validateEmail(emailInput.value)));
  phoneInput.addEventListener('input', () => setValidity(phoneInput, errPhone, validatePhone(phoneInput.value)));

  payBtn.addEventListener('click', (e) => {
    if (!validateAll()) {
      e.preventDefault();
      const firstInvalid = document.querySelector('.tm-input.invalid');
      if (firstInvalid) firstInvalid.focus({ preventScroll: false });
    } else {
    }
  });

  setTimeout(validateAll, 0);
})();

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('contactsMap');
  if (!el || typeof L === 'undefined') return;

  const map = L.map(el, {
    zoomControl: true,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; OSM & Carto',
    maxZoom: 19
  }).addTo(map);

  const places = [
    { name: 'Main Entrance', coords: [48.860611, 2.337644] },
    { name: 'Carrousel du Louvre', coords: [48.862500, 2.333100] },
    { name: 'Museum Shop', coords: [48.860100, 2.335800] },
  ];

  const pinIcon = L.divIcon({
    className: '',
    html: '<div class="map-pin"></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 22],
    popupAnchor: [0, -22],
  });

  const markers = places.map(p =>
    L.marker(p.coords, { icon: pinIcon })
      .addTo(map)
      .bindPopup(`<strong>${p.name}</strong>`)
  );

  const group = L.featureGroup(markers);
  map.fitBounds(group.getBounds().pad(0.2));

  el.addEventListener('mouseenter', () => map.scrollWheelZoom.enable());
  el.addEventListener('mouseleave', () => map.scrollWheelZoom.disable());
});


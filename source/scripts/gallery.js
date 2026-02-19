let imgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

shuffle(imgs);

const slider = document.querySelector("#gallery__slider");
const template = document.querySelector("#gallery__template");
const notTemplate = document.querySelector("#gallery__not-template");

if ("content" in document.createElement("template")) {
  for (let i = 0; i <= imgs.length - 1; i = i + 1) {
    var clone = template.content.cloneNode(true);
    const picture = clone.querySelector(".gallery__img");
    const source = picture.querySelector("source");
    const img = picture.querySelector("img");

    source.srcset = `./images/galery/galery${imgs[i]}-1x.webp 1x,
            ./images/galery/galery${imgs[i]}-2x.webp 2x`;
    img.src = `./images/galery/galery${imgs[i]}-1x.jpg`;
    img.srcset = `./images/galery/galery${imgs[i]}-2x.jpg 2x`;

    if (i === 0) {
      picture.style.marginTop = '50px';
    }

    slider.appendChild(clone);

//показать изобр при прокрутке







  }

} else {   // HTML-элемент template не поддерживается.
  slider.classList.add('js-not-template');
  slider.classList.remove('gallery__slider');
  slider.classList.remove('gallery__list');

  notTemplate.classList.remove('js-not-template');
  notTemplate.classList.add('gallery__slider');
  notTemplate.classList.add('gallery__list');
}


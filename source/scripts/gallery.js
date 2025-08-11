const imgsSrc = [
  'galery1-1x.webp',
  'galery2-1x.webp',
  'galery3-1x.webp',
  'galery4-1x.webp',
  'galery5-1x.webp',
  'galery6-1x.webp',
  'galery7-1x.webp',
  'galery8-1x.webp',
  'galery9-1x.webp',
  'galery10-1x.webp',
  'galery11-1x.webp',
  'galery12-1x.webp',
  'galery13-1x.webp',
  'galery14-1x.webp',
  'galery15-1x.webp'
]

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const LNG = 2.3364;
const LAT = 48.86091;
const ZOOM = 17;

// Координаты маркеров
const dataMarkers = [
{
  lat: 48.8602,
  lng: 2.3333
},
{
  lat: 48.8607,
  lng: 2.3397
},
{
  lat: 48.8619,
  lng: 2.3330
},
{
  lat: 48.8625,
  lng: 2.3365
}];

const myMap = L.map('map')
.on('load', () => {
  console.log('карта загружена');
})
    .setView({
      lat: LAT,
      lng: LNG,
    },
    ZOOM
    );

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(myMap);

const mainMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: false, // метка не перемещается
    // icon: mainIcon,
  }
);

mainMarker.addTo(myMap);

const markerGroup = L.layerGroup().addTo(myMap);

dataMarkers.forEach(({lat, lng}) => {
  const point = L.marker({lat, lng});
  point.addTo(myMap);
})

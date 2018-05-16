mapboxgl.accessToken = 'pk.eyJ1IjoidGhlZHlydCIsImEiOiJjamg4NXE1aGQwZno5MnFwY2lmZHZ5NjJvIn0.O39NoR8r4VqzVRbFZ_yJDQ';

var map = new mapboxgl.Map({
  container: 'techcrawl-map',
  style: 'mapbox://styles/thedyrt/cjh6x4ls709to2rlge6htq6z1',
  scrollZoom: false,
  center: [-122.6801,45.5248],
  zoom: 15,
});
// 45.524837,-122.6801553
window.mapInstance = map;

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

var geoControl = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
});
map.addControl(geoControl, 'top-left');
var test;
window.companies.forEach(function(company, index) {

  var el = document.createElement('div');
  el.innerHTML = index + 1;
  el.className = 'marker';
  el.style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/number-icon.png)';
  el.style.width = 50 + 'px';
  el.style.height = 50 + 'px';

  var handleClick = function() {
    if (test != undefined){
      test.style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/number-icon.png)';
    }
    console.log(this.name);
    window.companies.forEach(function(company) {
      company.isHighlighted = false;
    });
    this.isHighlighted = true;

    el.style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/gold-icon.png)';
    // el.style.backgroundImage = 'url(https://email-assets.thedyrt.com/2017/images/number-icon.png)';
    test = el;
  }.bind(company);

  el.addEventListener('click', handleClick);

  // add marker to map
  new mapboxgl.Marker(el)
    .setLngLat(company.coordinates)
    .addTo(map);
});

// var myEl = document.getElementsByClassName('marker');
// myEl.onclick = function(event){alert('Hello world');};

rivets.bind(document.body, {
  model: {
    companies: window.companies,
    handleCompanyClick: function(event, data) {
      console.log('THIS COMPANY WAS CLICKED, ', data.company.name);
      data.model.companies.forEach(function(company) {
        company.isHighlighted = false;
      });
      data.company.isHighlighted = true;
    },
  },
});

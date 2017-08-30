var map;

var coords = {
  "Bucharest": [44.4262602, 26.1012467],
  "London": [51.5024826, -0.1424019],
};

function drawRoute(origin, destination) {
  // ax + b = y
  let a = (coords[destination][1] - coords[origin][1])
    / (coords[destination][0] - coords[origin][0]);
  let b = coords[destination][1] - a * coords[destination][0];

  let steps = 100;
  let distanceX = coords[destination][0] - coords[origin][0];
  let stepSize = distanceX / (steps * 2 - 1);

  for(let i = 0; i < steps; ++i) {
    let x1 = coords[origin][0] + stepSize * 2 * i;
    let x2 = x1 + stepSize;
    let y1 = a * x1 + b;
    let y2 = a * x2 + b;

    map.drawPolyline({
      path: [[x1, y1], [x2, y2]],
      strokeColor: 'red',
      strokeOpacity: 0.7,
      strokeWeight: 2
    });
  }
}

$(document).ready(function(){
  map = new GMaps({
    el: '#map',
    lat: 44.4262602,
    lng: 26.1012467,
    zoomControl : true,
    zoomControlOpt: {
        style : 'SMALL',
        position: 'TOP_LEFT'
    },
    panControl : false,
    streetViewControl : false,
    mapTypeControl: false,
    overviewMapControl: false
  });

  map.setZoom(5);

  drawRoute("Bucharest", "London");
});

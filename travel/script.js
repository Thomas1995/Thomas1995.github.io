var map;

var coords = {
  "Bucharest": [44.4262602, 26.1012467],
  "London": [51.5024826, -0.1424019],
  "Dover": [51.126333, 1.2659698],
  "Sailsbury": [51.0797597, -1.843363],
  "Stonehenge": [51.1788853, -1.8284037],
  "Old Sarum": [51.1010906, -1.7934003],
};

function computeDistance(coords1, coords2) {
  return Math.sqrt(
    Math.pow((coords2[0] - coords1[0]), 2) +
    Math.pow((coords2[1] - coords1[1]), 2)
  );
}

function computeLineInfo(coords1, coords2) {
  // ax + b = y
  let a = (coords2[1] - coords1[1])
    / (coords2[0] - coords1[0]);
  let b = coords2[1] - a * coords2[0];

  return [a, b];
}

function computeBrokenLineStepSize(coords1, coords2, steps) {
  return (coords2[0] - coords1[0]) / (steps * 2 - 1);
}

function drawBrokenLine(coords1, coords2, color, steps) {
  let [a, b] = computeLineInfo(coords1, coords2);
  let stepSize = computeBrokenLineStepSize(coords1, coords2, steps);

  for(let i = 0; i < steps; ++i) {
    let x1 = coords1[0] + stepSize * 2 * i;
    let x2 = x1 + stepSize;
    let y1 = a * x1 + b;
    let y2 = a * x2 + b;

    map.drawPolyline({
      path: [[x1, y1], [x2, y2]],
      strokeColor: color,
      strokeOpacity: 0.7,
      strokeWeight: 2
    });
  }
}

function drawArrowHead(coords1, coords2, color, steps) {
  let [a, b] = computeLineInfo(coords1, coords2);
  let stepSize = computeBrokenLineStepSize(coords1, coords2, steps);

  let x0 = coords2[0] - stepSize * ((steps / 20) + 0.2);
  let y0 = a * x0 + b;

  a = -1 / a;
  b = y0 - a * x0;

  let x1 = x0 - stepSize * (steps / 10);
  let x2 = x0 + stepSize * (steps / 10);
  let y1 = a * x1 + b;
  let y2 = a * x2 + b;

  map.drawPolyline({
    path: [[x1, y1], coords2, [x2, y2]],
    strokeColor: color,
    strokeOpacity: 0.7,
    strokeWeight: 2
  });
}

function drawBrokenArrow(coords1, coords2, color, steps) {
  drawBrokenLine(coords1, coords2, color, steps);
  drawArrowHead(coords1, coords2, color, steps);
}

function drawSimpleRoute(origin, destination) {
  let distance = computeDistance(coords[origin], coords[destination]);

  let steps = Math.ceil(distance * 3.5);
  let colors = ['blue', 'green', 'yellow', 'orange', 'red'];
  let color = colors[Math.min(Math.floor(steps / 5), colors.length - 1)];

  drawBrokenArrow(coords[origin], coords[destination], color, steps);
}

function drawRoute(route) {
  for(let ii = 1; ii < route.length; ++ii)
    drawSimpleRoute(route[ii - 1], route[ii]);
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

  drawRoute(["Bucharest", "London"]);

  drawRoute(["London", "Sailsbury", "Stonehenge", "Old Sarum", "Sailsbury", "London"]);
  drawRoute(["London", "Dover", "London"]);
});

//preload/global variables
var myMap;
var canvas;
var mappa = new Mappa('Leaflet');
var options = {
  lat: 37.0902,
  lng: -95.7129,
  zoom: 4,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}

function setup(){
  canvas = createCanvas(1680,640);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas)
  //style
  myMap.style.position = "center";
  //load data
  lynchings = loadTable('./data/lynchings.csv', 'csv', 'header');
  //run draw function only when changes occur
  myMap.onChange(draw);
  //color
  fill(138,7,7);
  stroke(100);
}

function draw() {
  //clear canvas
  clear();
  for (var i = 0; i < lynchings.getRowCount(); i++) {
    //get longitude and latitude
    var latitude = Number(lynchings.getString(i, 'Latitude'));
    var longitude = Number(lynchings.getString(i, 'Longitude'));
    //api stuff
    if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {

      var pos = myMap.latLngToPixel(latitude, longitude);
      //get number of lynchings
      var size = lynchings.getString(i, 'Number');
      size = map(size, 59, 688, 1, 40) + myMap.zoom();
      //draw ellipse based on the number of lynchings
      ellipse(pos.x, pos.y, size, size);
    }
  }
}
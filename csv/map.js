function preload() {
  lynchings = loadTable('./data/Weblist_IDs_Test.csv', 'csv', 'header');
}

var getLocation =  function(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
    console.log(results);
    var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
    console.log(latitude, longitude);
    //document.getElementById("output").innerHTML = latitude + longitude;
  } else {console.log(status);}
  }); 
}

function setup() {
  for (var i = 0; i < lynchings.getRowCount(); i++) {
    // Get the lat/lng of each lynching
    var County = lynchings.getString(i, 'LynchCounty');
    //console.log(County);
    var State = lynchings.getString(i, 'LynchState');
    //console.log(State);
    getLocation(County, State);
  }
}
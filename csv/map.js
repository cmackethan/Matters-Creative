function preload() {
  lynchings = loadTable('/Users/cmackethan/Development/csv/data/Weblist_IDs.csv', 'csv', 'header');
}

var getLocation =  function(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      //console.log(latitude, longitude);
      document.getElementById("output").innerHTML = latitude + longitude;
      } 
  }); 
}

function setup() {
  for (var i = 0; i < lynchings.getRowCount(); i++) {
    // Get the lat/lng of each meteorite
    var County = lynchings.getString(i, 'LynchCounty');
    //console.log(County);
    //console.log(County);
    var State = lynchings.getString(i, 'LynchState');
    //document.write(State);
    //console.log(State);
    getLocation(County, State);
  }
}
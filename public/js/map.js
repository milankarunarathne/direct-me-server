function initMap() {
    var hardcodeloca = {lat: 79.891281, lng: 6.788071};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: hardcodeloca
  });
    var marker = new google.maps.Marker({
      position: hardcodeloca,
	  
      map: map
  });
}
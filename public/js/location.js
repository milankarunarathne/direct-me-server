

    function GetLocation() {
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById("txtAddress").value;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                alert("Latitude: " + latitude + "\nLongitude: " + longitude);
                var uluru = {lat: latitude, lng: longitude};
                var map = new google.maps.Map(document.getElementById('map'), {
                  zoom: 15,
                  center: uluru
              });
                var marker = new google.maps.Marker({
                  position: uluru,
				   //title: 'Hello World!'
                  map: map
              });
            } else {
                alert("Request failed.")
            }
        });
    }
	
	
	

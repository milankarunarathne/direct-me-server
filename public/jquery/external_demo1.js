
 
		  $(document).ready(function() {
	            //after button is clicked we download the data
           // initMap();
			
			$("#btn1").click(function(event){
				
		
			 //start ajax request
                $.ajax({
                    url: "/api/notifications",
					method: "GET",
                    //force to handle it as text
                    dataType: "JSON",
                     success: function (data) {
						 //console.log(data[0].location.latitude);
						 
						// console.log(data[0]._id)
						var length = data.length;
						console.log(data.length); 
						
						var mapOptions = {
        mapTypeId: 'roadmap'
    };
						var map = new google.maps.Map(document.getElementById('map'), mapOptions);
						map.setTilt(45);
        var image = {
          url: '/images/accident_fire.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(92, 92),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
        };
		
		var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
		
		
		
		
		
		
		
					 var bounds = new google.maps.LatLngBounds();
				for(var i=0;i< data.length;i++){
					if(data[i].damageType=='Fire'){
							
				var marker=[];
				//var hardcodeloca=[];
				console.log(data[i].location.latitude);
				console.log(data[i].location.longitude);
					
	var geocoder = new google.maps.Geocoder();
	var position = new google.maps.LatLng(data[i].location.latitude,data[i].location.longitude);
    bounds.extend(position);
    marker = new google.maps.Marker({
		animation: google.maps.Animation.DROP,
    position: position,
    map: map,
	icon: image,
    shape: shape,
           
  });
  
  

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
				alert("Click to clear accident");
				//console.log(data[i]._id);
				//console.log(data[i]._id);
				
					
					$.ajax({
						type: 'PUT',
						data: JSON.stringify(data),
				        contentType: 'application/json',
                        url: "/api/notifications",						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });

				
            }
        })(marker, i));
		
	  map.fitBounds(bounds);				
					
					
					}
					
					}
					
						
						 }
                });
            });
        });
		
		
	function initMapp(lat,lon) {
		
	}        

	
	
	
	
	
		
		
		
		

 
$(document).ready(function() {
	            //after button is clicked we download the data
          
			
$("#btn3").click(function(event){
var decision;
$("#Confirm").click(function(event){
	decision=1;
});
    $("#Repair").click(function(event){
	decision=2;
	
});            //start ajax request
                $.ajax({
                    url: "/api/notifications",
					method: "GET",
                    //force to handle it as text
                    dataType: "JSON",
                     success: function (data) {
						 //console.log(data[0].location.latitude);
						 
						// console.log(data[0]._id)
						var length = data.length;
						//console.log(data.length); 
						
var mapOptions = {
 mapTypeId: 'roadmap'
    };
						var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    map.setTilt(45);
        var image = {
          url: '/images/pit_small.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(92, 92),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
					 var bounds = new google.maps.LatLngBounds();
				for(var i=0;i< data.length;i++){
					if(data[i].damageName=='Bump'){
				var marker=[];
					var hardcodeloca=[];
//console.log(data[i].location.latitude);
					//console.log(data[i].location.longitude);
					
var geocoder = new google.maps.Geocoder();
var position = new google.maps.LatLng(data[i].location.latitude,data[i].location.longitude);
 bounds.extend(position);
        		if(data[i].repairing==true){
			 marker = new google.maps.Marker({
            position: position,
            map: map,
			 icon: "http://maps.google.com/mapfiles/ms/micons/green.png",
			title:data[i]._id,
           
  });
			
		}
       else{
		   marker = new google.maps.Marker({
            position: position,
            map: map,
			  icon: "http://maps.google.com/mapfiles/ms/micons/orange.png",
			title:data[i]._id,
           
  }); 
  }

	  map.fitBounds(bounds);				
				google.maps.event.addListener(marker, 'click', function() {
this.setIcon('http://maps.google.com/mapfiles/ms/micons/green.png');
   

				var data = {};
					data._id = this.getTitle();
					data.confirmStatus = true;
					
					$.ajax({
						type: 'POST',
						data: JSON.stringify(data),
				        contentType: 'application/json',
                        url: '/api/notifications',						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });
//console.log( this.getTitle());

  }); 	


			  google.maps.event.addListener(marker, 'rightclick', function(event) {
					
 this.setMap(null);

				var data = {};
					data._id = this.getTitle();
					data.repairingStatus = true;
					
					$.ajax({
						type: 'POST',
						data: JSON.stringify(data),
				        contentType: 'application/json',
                        url: '/api/notifications',						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });
//console.log( this.getTitle());

  }); 	 
					

					

			}
					
					
				}
					// var obj = jQuery.parseJSON(data);
						
						 //var result = JSON.stringify(obj);
						 //alert(result);
						
						 }
                });
            });
        });
		
		
	function initMapp(lat,lon) {
		
	}        

		
		/*function initMap(lat, lon) {
		var geocoder = new google.maps.Geocoder();	
        var uluru = {lat: lat, lng: lon};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }*/
		
		
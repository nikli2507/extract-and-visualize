function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.712380, lng: 13.620946 },
    zoom: 6.8
  });

  const geocoder = new google.maps.Geocoder();

  var locations = [];
  for (const course of JSON.parse(localStorage.getItem("courses"))) {
    if(course.selected) {
      try {
        for(let location of course.dates_locations_list[1]) {
          locations.push(location);
        }
      } catch (error) {}
    }
  }

  locations.forEach((location) => {
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK" && results[0].geometry) {
        const marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          title: location
        });
      }
    });
  });
}

google.maps.event.addDomListener(window, "load", initMap);

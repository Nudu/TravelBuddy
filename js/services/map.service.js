
export default {
    initMap,
    addMarker,
    panTo
}


var map;

function initMap(lat = 32.0672529, lng = 34.7687332) {
    // console.log('InitMap'); 
    return _connectGoogleApi()
    .then(() => {
        // console.log('google available');
        map = new google.maps.Map(
            document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
        console.log('Map is Set!');
        // console.log('Map', map);
    })
}

function addMarker(loc,txt) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: txt
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng( lat,  lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyD44zWuImHFxSCtZiPIwX4wizPeYWAedX4';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);
    
    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}





export const mapService = {
    initMap,
    addMarker,
    panTo,
}

var map;
var gLocations;

export function initMap(lat = 32.0749831, lng = 34.9120554) {

    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            map.addListener('click',createLocation)
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAzmpPcKgsno0kzRU0fquuoQ-QruuNIFRc'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function createLocation(mapClick){
    // var coords = {lat: mapClick.latLng[0].toString(), lng: mapClick.latLng[1].toString()}
    panTo(mapClick.latLng.toString())
    console.log(mapClick.latLng.toString());
    // var latlng = {lat:mapClick.lat, lng:mapClick.lng}
}




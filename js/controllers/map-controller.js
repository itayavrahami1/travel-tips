import { mapService } from '../services/map-service.js'

export const mapController = {
    initMap,
    addMarker,
    panTo,
    renderItems
}

var map;

export function initMap(lat = 32.0749831, lng = 34.9120554) {

    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            map.addListener('click', onMapClick)
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

function onMapClick(ev) {
    mapService.createLocation(ev, name)
        .then(renderItems)
}

function onGoToLocation() {
    mapService.goToLocation(locId)
        .then()
}


function renderItems() {
    mapService.getLocs()
        .then(Locs => {
            const strHTMLs = Locs.map(loc =>
                `<li>
                ${loc.id} | ${loc.name}| ${loc.lat}| ${loc.lng}| ${loc.createdAt}
                <button class="btn btn-delete" data-id="${loc.id}">GO</button>
                <button class="btn btn-delete" data-id="${loc.id}">Delete</button>
            </li>`)
            document.querySelector('.location-list').innerHTML = strHTMLs.join('')
        })
        
        // console.log(strHTMLs);
}

function onInsertLocation() {
    var searchedLocation = document.querySelector('#search').value;
}

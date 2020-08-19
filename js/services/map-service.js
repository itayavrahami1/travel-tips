//TODO Build the LocationService managing Locations:
//{id, name, lat, lng, weather, createdAt, updatedAt}
import {mapStorage} from '../storage/loc-storage.js'
const LOC_ID_URL = 'http://www.filltext.com/?rows=1&password={randomString|5}&pretty=true'
const LOCS_KEY = 'myLocations'
const LOC_NAME_INIT_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='

var gFavLoc = [
    {
        id: '001',
        name: 'home',
        lat: 32.0749831,
        lng: 34.9120554,
        createdAt: Date.now(),
        // updatedAt
    }
]

export const mapService = {
    getLocs: getLocs,
    getPosition: getPosition,
    createLocation
}
var locs = [{ lat: 11.22, lng: 22.11 }]

function getLocs() {
    var locs = mapStorage.loadLocsFromStorage(LOCS_KEY);
    // if (locs.length === 0) locs = gFavLoc;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function createLocation(ev, name = 'home') {

    var locNameUrl = `${LOC_NAME_INIT_URL}${ev.latLng.lat()},${ev.latLng.lng()}&key=AIzaSyAzmpPcKgsno0kzRU0fquuoQ-QruuNIFRc`
    var idPrm = axios.get(LOC_ID_URL);
    var namePrm = axios.get(locNameUrl);

    return Promise.all([idPrm, namePrm])
        .then(values => {
            var loc = {
                id: values[0].data[0]['password'],
                name: values[1].data.results[0].formatted_address,
                lat: ev.latLng.lat(),
                lng: ev.latLng.lng(),
                createdAt: Date.now(),
            }
            gFavLoc.push(loc);
            mapStorage.saveLocsToStorage(LOCS_KEY,gFavLoc)
            return gFavLoc;
        })
}

function goToLocation(locId){
    var currLoc = gFavLoc.find(loc => {
        return loc.id === locId;
    })


}


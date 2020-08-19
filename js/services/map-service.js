//TODO Build the LocationService managing Locations:
//{id, name, lat, lng, weather, createdAt, updatedAt}
import {mapStorage} from '../storage/loc-storage.js'
const LOC_ID_URL = 'http://www.filltext.com/?rows=1&password={randomString|5}&pretty=true'
const LOCS_KEY = 'myLocations'

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
    var idPrm = axios.get(LOC_ID_URL)
    return idPrm.then(res => res.data[0].password)
        .then(id => {
            var loc = {
                id,
                name,
                lat: ev.latLng.lat(),
                lng: ev.latLng.lng(),
                createdAt: Date.now(),
            }
            gFavLoc.push(loc);
            mapStorage.saveLocsToStorage(LOCS_KEY,gFavLoc)
            return gFavLoc;
        })
}


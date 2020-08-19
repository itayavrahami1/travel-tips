//TODO Build the LocationService managing Locations:
    //{id, name, lat, lng, weather, createdAt, updatedAt}

    var gFavLoc = [
        {
            id: '001',
            name: 'home',
            lat: 32.0749831,
            lng: 34.9120554,
            createdAt: Date.now (),
            updatedAt:
        }
    ]

export const mapService = {
    getLocs: getLocs,
    getPosition: getPosition
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


console.log('Main!');

import { mapService } from './services/map-service.js'
import { mapController } from './controllers/map-controller.js'


mapService.getLocs()
    .then(locs => console.log('locs', locs))

window.onload = () => {
    // addEvenetListeners()
    mapController.initMap()
        .then(() => {

            mapController.addMarker({ lat: 32.0749831, lng: 34.9120554 });
        })
        .catch(console.log('INIT MAP ERROR'));

    mapService.getPosition()
        .then(pos => {

            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('Cannot get user-position', err);
        })
}

document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    mapController.panTo(35.6895, 139.6917);
})

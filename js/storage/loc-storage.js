// TDOD - add saveLocationsToLocalStorage

export const mapStorage = {
    saveLocsToStorage,
    loadLocsFromStorage
}


function saveLocsToStorage(key,val) {
    var str = JSON.stringify(val);
    localStorage.setItem(key, str)
}

function loadLocsFromStorage(key) {
    var str = localStorage.getItem(key);
    var val = JSON.parse(str)
    return val;
}
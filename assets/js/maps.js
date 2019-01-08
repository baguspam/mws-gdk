// Get data
const URL = "assets/data/data_maps.json";

// Initiate map
var myMap = L.map('mymap').setView([-6.2212999, 106.7914438], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(myMap);
// Fetch
fetch(URL).then(function(response){
    if (response.status !== 200) {
        console.log('There is a problem . Status Code: ' + response.status);
        throw response.statusText;
    }
    return response.json()
}).then ( resp => {
    localStorage.setItem('peta', JSON.stringify(resp.peta));
    setView();
}).catch(function(err){
    console.log(err);
});

// Set view
let img = document.getElementById('image');
let review = document.getElementById('review');
let imgElem = document.createElement('img');
let places;

img.appendChild(imgElem);

setView();

function setView() {
    places = JSON.parse(localStorage.getItem('peta'));
    //console.log(places);

    if (places) {
        for (var p of places) {
            var marker = L.marker(p.strLoc).addTo(myMap).bindPopup(p.strNameMap);
            marker.on('click', showLocation);
        }
    }
}

function findLocation(x, y) {
    for (let i = 0; i < places.length; i++) {
        if (places[i].strLoc[0] === x &&
            places[i].strLoc[1] === y) {
            return i;
        }
    }
    return -1;
}

function showLocation(e) {
    let idx = findLocation(e.latlng.lat, e.latlng.lng);
    if (idx >= 0) {
        imgElem.src = "assets/img/"+places[idx].strImg;
        imgElem.alt = places[idx].strNameMap;
        review.innerHTML = places[idx].strDesc;
    }
}
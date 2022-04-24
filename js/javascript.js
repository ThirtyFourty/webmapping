let map = L.map('map').setView([58.373523, 26.716045], 12)

const osm =
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'OpenStreetMap contributors',
    })

osm.addTo(map)

// async function addDistrictsGeoJson(url) {
//     const response = await fetch(url)
//     const data = await response.json()
//     const polygons = L.geoJson(data)
//     console.log(polygons)
//     polygons.addTo(map)
// }

// addDistrictsGeoJson('./geojson/tartu_city_districts_edu.geojson')

// osm.addTo(map)

// async function addCelltower(url) {
//     const response = await fetch(url)
//     const data = await response.json()
//     const polygons = L.geoJson(data)
//     polygons.addTo(map)

//     addCelltowers('tartu_city_celltowers_edu.geojson')
//     var markers = L.markerClusterGroup('tartu_city_celltowers_edu.geojson');
//     markers.addLayer(L.marker(getRandomLatLng(map)));
// }

fetch('geojson/tartu_city_districts_edu.geojson')
    .then(response => response.json())
    .then(json => {
        L.geoJson(json.features, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties['NIMI'])
            }
        }).addTo(map);
    });

var markers = L.markerClusterGroup();

fetch('geojson/tartu_city_celltowers_edu.geojson')
    .then(response => response.json())
    .then(json => {
        var cellTowers = L.geoJson(json);
		markers.addLayer(cellTowers);
		map.addLayer(markers);
		map.fitBounds(markers.getBounds());
    });

function setDefaultView() {
    map.setView([58.373523, 26.716045], 12);
}
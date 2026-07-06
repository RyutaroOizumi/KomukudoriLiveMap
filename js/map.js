function createMap() {

    const map = L.map('map').setView([38.5, 138.5], 5);

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            attribution: '© OpenStreetMap contributors'
        }
    ).addTo(map);

    return map;
}

console.log("map.js が読み込まれました");
console.log(createMap);
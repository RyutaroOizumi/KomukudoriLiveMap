function createMap() {

    // デフォルトのズームボタンを消す
    const map = L.map('map', {
        zoomControl: false
    }).setView([38.5, 138.5], 5);

    // ズームボタンを右下に追加
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // 地図
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
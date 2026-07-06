// ------------------------------------
// 渡りルートを描画
// ------------------------------------
function drawRoutes(map, gps, birdDict) {

    // BirdIDごとにGPSをまとめる
    const routes = {};

    gps.forEach(function(record) {

        // BirdIDがない
        if (!record.BirdID) return;

        // 緯度経度がない
        if (!record.Latitude || !record.Longitude) return;

        // 非公開個体は描画しない
        if (!birdDict[record.BirdID]) return;

        if (!routes[record.BirdID]) {
            routes[record.BirdID] = [];
        }

        routes[record.BirdID].push(record);

    });


    // ----------------------------
    // 個体ごとに描画
    // ----------------------------
    Object.keys(routes).forEach(function(id) {

        const bird = birdDict[id];

        if (!bird) return;


        // 日付順
        routes[id].sort(function(a, b) {
            return new Date(a.DateTime) - new Date(b.DateTime);
        });


        // 座標配列
        const points = routes[id].map(function(record) {

            return [
                Number(record.Latitude),
                Number(record.Longitude)
            ];

        });


        // 2点未満なら描画しない
        if (points.length < 2) return;


        // ルート描画
        const polyline = L.polyline(points, {

            color: bird.Color || "#3388ff",

            weight: 4,

            opacity: 0.85,

            lineJoin: "round",

            lineCap: "round"

        });

        polyline.addTo(map);

    });

}